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

//import { IGenesis } from "../interfaces/IGenesis.sol";

import { GenesisCoffer } from "../GenesisCoffer.sol";

contract GenesisFund is GenesisCoffer
{
    mapping(address => bool) public assetsWhiteList;

    address private genesis;

    event relocateRequest();

    constructor(
        string memory _name,
        string memory _ticker,
        address[] memory _assetsWhiteList,
        address _genesis,
        uint256 amount,
        uint256 managementFee,
        address _cofferSettings
        )
        GenesisCoffer(amount * 1000, _name, _ticker, managementFee, _cofferSettings)
    {
        genesis = _genesis;
        for (uint256 i = 0; i < _assetsWhiteList.length; i++)
            assetsWhiteList[_assetsWhiteList[i]] = true;
    }

    // function rebalance() external {
    //     require(msg.sender == manager, "require: sender is manager");
    // }

    function relocate(address[] memory assets, uint16[] memory locationPercent) external {
        require(msg.sender == manager, "require: sender is manager");
        require(assets.length == locationPercent.length, "Wrong parameters");
        for (uint256 i = 0; i < assets.length; i++)
            require(assetsWhiteList[assets[i]], "Asset in not whilelisted");
        
        uint16 percentSum = 0;
        for (uint256 i = 0; i < locationPercent.length; i++)
            percentSum += locationPercent[i];

        require(percentSum == 10000, "Total location should be 100%");

        emit relocateRequest(); // TODO Data 
    }
    
}