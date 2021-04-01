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


import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import { IGenesisCofferSettings } from "./interfaces/IGenesisCofferSettings.sol";

contract GenesisCoffer is
    ERC20
{
    address[] public assets;

    uint256 public managementFee;
    uint256 public lastManagementFeeClaim;
    uint256 public tokenMultiplier = 1;

    address public manager;

    IGenesisCofferSettings cofferSettings;

    constructor(
        uint256 initialDeposit,
        string memory name,
        string memory ticker,
        uint256 _managementFee,
        address _cofferSettings
        )
        ERC20(name, ticker)
        {
            // TODO get deposit
            cofferSettings = IGenesisCofferSettings(_cofferSettings);
            uint256 minDeposit = cofferSettings.getMinManagerInitialDeposit();
            require(initialDeposit >= minDeposit,  "GenesisCoffer: minDeposit is less than minDeposit");
            managementFee = _managementFee;
            lastManagementFeeClaim = block.timestamp;
            _mint(tx.origin, (initialDeposit - minDeposit) * tokenMultiplier);
            //Check
            _mint(address(this), minDeposit * tokenMultiplier);
            manager = tx.origin;            
        }

    function init(
        address[] calldata _assets
    )
        external
    {
        for(uint i = 0; i < _assets.length; i++){
            assets.push(_assets[i]);
        }
    }

    function ClaimManagementFee()
        public
    {
        uint256 managementFeeCalculated = calculateManagementFee();
        _mint(manager, managementFeeCalculated);
        lastManagementFeeClaim = block.timestamp;
    }

    function issue(
        address owner,
        uint256 tokensAmount
    )
        external
    {
        ClaimManagementFee();
        _mint(owner, tokensAmount);        
    }

    function redeem(
        address owner,
        uint256 tokens
    )
        external
    {
        ClaimManagementFee();
        _burn(owner, tokens);        
    }

    function getAssets()
        external view
        returns (address[] memory)
        {
            return assets;
        }

    function calculateManagementFee()
        private view
        returns (uint256)
    {
        uint256 minDeposit = cofferSettings.getMinManagerInitialDeposit();
        uint256 totalSeconds = block.timestamp - lastManagementFeeClaim;
        uint256 managementFeeCalculated = (totalSupply() - (minDeposit * tokenMultiplier)) * managementFee * totalSeconds / 365 days / 100 / 100;

        return managementFeeCalculated;
    }
}