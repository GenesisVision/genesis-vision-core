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
import { IGenesisFundImpl } from "../interfaces/IGenesisFundImpl.sol";

import { GenesisCoffer } from "../GenesisCoffer.sol";

contract GenesisFund is GenesisCoffer
{
    IGenesis private genesisCore;
    IGenesisFundImpl private fundImpl;

    constructor(
        string memory _name,
        string memory _ticker,
        address _genesisCore,
        uint256 amount,
        uint256 managementFee,
        address _cofferSettings
        )
        GenesisCoffer(amount * 1000, _name, _ticker, managementFee, _cofferSettings)
    {
        genesisCore = IGenesis(_genesisCore);
    }

    function rebalance() external {
        fundImpl.rebalance();
    }

    function relocate(bytes32[] memory relocateData) external {
        fundImpl.relocate(relocateData);
    }
    
}