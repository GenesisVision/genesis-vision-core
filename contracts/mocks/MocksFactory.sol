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

import { Erc20Mocked } from "./Erc20Mocked.sol";
import { ExchangeWrapperMocked } from "./ExchangeWrapperMocked.sol";

import "hardhat/console.sol";

contract MocksFactory
{
    event LogAddress(address text);

    function CreateErc20(string calldata name, string calldata symbol)
        external
        returns (address)
    {
        Erc20Mocked token = new Erc20Mocked(name, symbol);
        emit LogAddress(address(token));
        return address(token);
    }

    function CreateExchange()
        external
        returns (address)
    {
        ExchangeWrapperMocked exchange = new ExchangeWrapperMocked();
        emit LogAddress(address(exchange));
        return address(exchange);
    }
}