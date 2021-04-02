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

import { IGenesis } from "../interfaces/IGenesis.sol";
import { ILiquidityPool } from "../interfaces/ILiquidityPool.sol";

import { GenesisCoffer } from "../GenesisCoffer.sol";
import  "../../lib/Orders.sol";

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GenesisProgram is GenesisCoffer
{
    mapping(address => bool) public assetsWhiteList;

    IGenesis private genesisCore;

    constructor(
        string memory _name,
        string memory _ticker,
        address[] memory _assetsWhiteList,
        address _genesisCore,
        uint256 amount,
        uint256 managementFee,
        address _cofferSettings
        )
        GenesisCoffer(amount * 1000, _name, _ticker, managementFee, _cofferSettings)
    {
        genesisCore = IGenesis(_genesisCore);
        for (uint256 i = 0; i < _assetsWhiteList.length; i++)
            assetsWhiteList[_assetsWhiteList[i]] = true;
    }

    function exchangeOrder(address from, address to, uint srcAmount, uint minDestAmount, uint expirationDate)
        external 
    {
        require(msg.sender == manager, "require: sender is manager");
        if(assetsWhiteList[from] != true || assetsWhiteList[to] != true)
            revert("Symbol is not allowed");
        
        ILiquidityPool pool = ILiquidityPool(genesisCore.getLiquidityPool());
        
        IERC20 erc20From = IERC20(from);
        erc20From.allowance(msg.sender, address(pool));
        // TODO check allowance and amount

        Orders.Order memory order;
        order.maker = address(this); // check
        order.fromToken = from;
        order.toToken = to;
        order.amountSrc = srcAmount;
        order.minAmountDest = minDestAmount;
        order.expirationDate = expirationDate;

        pool.placeOrder(order);
    }
}