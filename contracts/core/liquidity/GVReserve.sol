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

import "../../lib/AdminOperatorAccess.sol";

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GVReserve is AdminOperatorAccess
{
    address private pool; 

    function setLiquidityPool(address _pool) public onlyAdmin {
        pool = _pool;
    }

    function transfer(address token, uint amount, address recipient) public{
        require(msg.sender == pool, "require: sender = liquidity pool");
        IERC20 erc20 = IERC20(token);
        erc20.transfer(recipient, amount);
    }
}