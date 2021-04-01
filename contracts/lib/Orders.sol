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

library Orders {
    struct Order {
        address maker;
        address fromToken;
        address toToken;
        uint256 amountSrc;
        uint256 minAmountDest;
        uint256 expirationDate;
    }

    function hash(Order memory order) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    order.maker,
                    order.fromToken,
                    order.toToken,
                    order.amountSrc,
                    order.minAmountDest
                )
            );
    }

    function validate(Order memory order) internal pure {
        require(order.maker != address(0), "invalid-maker");
        require(order.fromToken != address(0), "invalid-from-token");
        require(order.toToken != address(0), "invalid-to-token");
        require(order.fromToken != order.toToken, "duplicate-tokens");
        require(order.amountSrc > 0, "invalid-amountSrc");
        require(order.minAmountDest > 0, "invalid-minAmountDest");
        require(order.expirationDate > 0, "invalid-expirationDate");
    }
}