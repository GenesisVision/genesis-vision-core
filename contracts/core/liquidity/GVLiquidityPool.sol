/*
    Copyright 2021 Genesis Vision LP.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

    SPDX-License-Identifier: Apache-2.0
*/

pragma solidity ^0.8.0;

import "../interfaces/ILiquidityPool.sol";
import "../interfaces/IReserve.sol";

import "../../lib/Orders.sol";
import "../../lib/AdminOperatorAccess.sol";

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "hardhat/console.sol";

contract GVLiquidityPool is ILiquidityPool, AdminOperatorAccess
{
    using Orders for Orders.Order;
    
    event NewOrder(bytes32 orderHash);
    event OrderCancelled(bytes32 orderHash);

    address private gvReserve;

    mapping (bytes32 => Orders.Order) orders;
   
    function setGVReserve(address _gvReserve) public onlyAdmin {
        gvReserve = _gvReserve;
    }

    function getOrder(bytes32 orderHash) 
        view public
        returns (Orders.Order memory)
    {
        return orders[orderHash];
    } 

    function placeOrder(Orders.Order memory order) override external {
        order.validate();
        bytes32 hash = order.hash();
        // Sign
        require(msg.sender == order.maker, "Wrong order sender");
        console.log("Order: %s", orders[hash].maker);
        require(orders[hash].maker == address(0), "order-exists");
        orders[hash] = order;
        emit NewOrder(hash);
    }

    function cancelOrder(bytes32 orderHash) external {
        Orders.Order memory order = orders[orderHash];
        require(order.maker == msg.sender, "require: maker = sender");
        delete orders[orderHash];
        emit OrderCancelled(orderHash);
    }

    function executeOrder(bytes32 orderHash, uint256 amount) external onlyOperator {
        Orders.Order memory order = orders[orderHash];
        require(order.expirationDate > block.timestamp, "Order is expired");
        require(order.minAmountDest <= amount, "Order amount is less than min amount");

        IERC20 srcToken = IERC20(order.fromToken);
        srcToken.transferFrom(order.maker, gvReserve, order.amountSrc);
        
        IReserve reserve = IReserve(gvReserve);
        reserve.transfer(order.toToken, amount, order.maker);
        delete orders[orderHash];
    }
}