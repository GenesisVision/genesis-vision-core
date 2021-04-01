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

interface IGenesis {
    function log(string calldata text) external;

    function setRequiredAssetAddress(
        address assetAddress
        )
        external;
    
    function getRequiredAssetAddress(
        )
        external returns (address);

    function getExchangeWrapper() external view returns (address);
    function getTreasury() external view returns (address);
    
    function createProgram(
        bytes32 name,
        address[] calldata assetsWhiteList,
        uint256 wethAmount
    )
        external
        returns (address);
    
    function setLiquidityPool(address _liquidityPool) external;

    function getLiquidityPool() external view returns (address);
}