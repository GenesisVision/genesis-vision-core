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


import { IGenesisAssetsFactory } from "../interfaces/IGenesisAssetsFactory.sol";
import { IGenesisFundsFactory } from "../interfaces/IGenesisFundsFactory.sol";
import { IGenesisProgramsFactory } from "../interfaces/IGenesisProgramsFactory.sol";

import { AdminOperatorAccess } from "../../lib/AdminOperatorAccess.sol";

contract GenesisAssetsFactory is
    IGenesisAssetsFactory,
    AdminOperatorAccess
{

    IGenesisFundsFactory private genesisFundsFactory;
    IGenesisProgramsFactory private genesisProgramsFactory;

    function setFundsFactory(
        address _fundsFactory
        )
        onlyAdmin
        external 
    {
        genesisFundsFactory = IGenesisFundsFactory(_fundsFactory);
    }

    function setProgramsFactory(
        address _programsFactory
        )
        onlyAdmin
        external 
    {
        genesisProgramsFactory = IGenesisProgramsFactory(_programsFactory);
    }

    function createProgram(
        string memory _name,
        string memory _ticker,
        address[] memory _assetsWhiteList,
        address _genesis,
        uint256 amount,
        uint256 managementFee,
        address _cofferSettings
    )
        external override
        returns (address) {
            return genesisProgramsFactory.createProgram(_name, _ticker, _assetsWhiteList, _genesis, amount, managementFee, _cofferSettings);
        }

    function createFund(
        string memory _name,
        string memory _ticker,
        address[] memory _assetsWhiteList,
        address _genesis,
        uint256 amount,
        uint256 managementFee,
        address _cofferSettings
    )
        external override
        returns (address){
            return genesisFundsFactory.createFund(_name, _ticker, _assetsWhiteList, _genesis, amount, managementFee, _cofferSettings);
        }
}