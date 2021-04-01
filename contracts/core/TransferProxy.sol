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

import { ITreasury } from "./interfaces/ITreasury.sol";
import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TransferProxy
{
    using SafeMath for uint256;

    ITreasury private treasury;

    constructor(
        address _treasury
    )
    {
        treasury = ITreasury(_treasury);
        treasury.setTransferProxy(address(this));
    }

    function batchDeposit(
    address[] calldata _tokens,
    uint256[] calldata _quantities
    )
        external
    {
        uint256 tokenCount = _tokens.length;

        require(
            tokenCount > 0,
            "TransferProxy.batchDeposit: Tokens must not be empty"
        );

        require(
            tokenCount == _quantities.length,
            "TransferProxy.batchDeposit: Tokens and quantities lengths mismatch"
        );

        for (uint256 i = 0; i < tokenCount; i++) {
            if (_quantities[i] > 0) {
                ERC20 token = ERC20(_tokens[i]);

                uint256 currentAllowance = token.allowance(msg.sender, address(this));

                token.transferFrom(msg.sender, address(treasury), _quantities[i]);

                uint256 newAllowance = token.allowance(msg.sender, address(this));

                require(
                    newAllowance == currentAllowance.sub(_quantities[i]),
                    "TransferProxy.batchDeposit: Invalid post transfer balance"
                );
            }
        }

        treasury.addTokensBatch(_tokens, msg.sender, _quantities);
    }
}