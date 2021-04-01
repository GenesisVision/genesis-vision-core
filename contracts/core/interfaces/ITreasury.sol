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

interface ITreasury {

    /* Withdraw tokens to the account */
    function withdraw(
        address tokenAddress,
        address to,
        uint256 quantity
    )
        external;

    /* Increment quantity of a token owned by address */
    function addTokens(
        address tokenAddress,
        address owner,
        uint256 quantity
    )
        external;

    /* Decrement quantity of a token owned by address */
    function removeTokens(
        address tokenAddress,
        address owner,
        uint256 quantity
    )
        external;

    function setTransferProxy(address _transferProxy) external;
    function setGenesis(address _genesis) external;

     /* Transfers tokens associated with one account to another */
    function transferBalance(
        address tokenAddress,
        address from,
        address to,
        uint256 quantity
    )
        external;

    /* Increment quantities of a token collection owned by address */
    function addTokensBatch(
        address[] calldata tokens,
        address owner,
        uint256[] calldata quantities
    )
        external;

    /* Decrement quantities of a token collection owned by address */
    function removeTokensBatch(
        address[] calldata tokens,
        address owner,
        uint256[] calldata quantities
    )
        external;

     /* Transfers tokens associated with one account to another */
    function transferBalanceBatch(
        address[] calldata tokens,
        address from,
        address to,
        uint256[] calldata quantities
    )
        external;

     /* Get balance of particular contract for owner. */
    function getOwnerBalance(
        address tokenAddress,
        address owner
    )
        external
        view
        returns (uint256);
}