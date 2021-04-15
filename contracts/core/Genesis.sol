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

import { IGenesisCoffer } from "./interfaces/IGenesisCoffer.sol";
import { ITreasury } from "./interfaces/ITreasury.sol";
import { IGenesis } from "./interfaces/IGenesis.sol";
import { ILiquidityPool } from "./interfaces/ILiquidityPool.sol";

import { GenesisProgram } from "./programs/GenesisProgram.sol";
import { GenesisCofferSettings } from "./GenesisCofferSettings.sol";
import { AdminOperatorAccess } from "../lib/AdminOperatorAccess.sol";


import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Genesis is AdminOperatorAccess
{
    event LogText(string text);
    event LogUint256(uint256 text);
    event LogAddress(address text);

    function log(string calldata text)
        external
    {
        emit LogText(text);
    }

    
    ITreasury private treasury;
    ILiquidityPool private liquidityPool;
    address public requiredAssetAddress;

    constructor(
        address _treasury
    )
    {
        treasury = ITreasury(_treasury);
        treasury.setGenesis(address(this));
    }

    function setRequiredAssetAddress(
        address assetAddress
        )
        external
    {
        requiredAssetAddress = assetAddress;
    }

    function setLiquidityPool(
        address _liquidityPool
        )
        onlyAdmin
        external 
    {
        liquidityPool = ILiquidityPool(_liquidityPool);
    }

    function getLiquidityPool() external view returns (address){
        return address(liquidityPool);
    }

    function getTreasury() public view returns (address){
        return address(treasury);
    }

    function createProgram(
        string calldata name,
        string calldata ticker,
        address[] calldata assetsWhiteList,
        uint256 wethAmount,
        uint256 managementFee
    )
        external
        returns (address)
    {
        GenesisCofferSettings settings = new GenesisCofferSettings(100);

        GenesisProgram program = new GenesisProgram(name, ticker, assetsWhiteList, address(this), wethAmount, 
                                    managementFee, address(settings));

        emit LogAddress(address(program));

        treasury.transferBalance(requiredAssetAddress, msg.sender, address(program), wethAmount);

        return address(program);
    }

    function issue(
        address cofferAddress,
        uint256 tokens
    )
        external
    {
        IGenesisCoffer coffer = IGenesisCoffer(cofferAddress);
        address[] memory assets = coffer.getAssets();
        uint256 cofferSupply = coffer.totalSupply();

        uint256[] memory quantities = new uint256[](assets.length);

        for (uint i = 0; i < assets.length; i++) {
            uint256 assetAmount = treasury.getOwnerBalance(assets[i], cofferAddress);
            uint amountToTransfer = divUp(assetAmount * tokens, cofferSupply);
            quantities[i] = amountToTransfer;
        }

        treasury.transferBalanceBatch(assets, msg.sender, cofferAddress, quantities);

        coffer.issue(msg.sender, tokens);
    }

    function redeem(
        address cofferAddress,
        uint256 tokens
    )
        external
    {
        IGenesisCoffer coffer = IGenesisCoffer(cofferAddress);
        address[] memory assets = coffer.getAssets();
        uint256 cofferSupply = coffer.totalSupply();

        uint256[] memory quantities = new uint256[](assets.length);
        for (uint i = 0; i < assets.length; i++) {
            uint256 assetAmount = treasury.getOwnerBalance(assets[i], cofferAddress);
            uint amountToTransfer = assetAmount * tokens / cofferSupply;
            quantities[i] = amountToTransfer;
        }

        treasury.transferBalanceBatch(assets, cofferAddress, msg.sender, quantities);

        coffer.redeem(msg.sender, tokens);
    }

    function divUp(uint256 a, uint256 m) public pure returns (uint) 
    {
        uint256 mod = a % m;
        if(mod == 0)
            return a / m;
        return a / m + 1;
    }
}