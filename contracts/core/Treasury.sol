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


import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./interfaces/ITransferProxy.sol";
import "./interfaces/IGenesis.sol";

contract Treasury
{
    using SafeMath for uint256;
    
    mapping (address => mapping (address => uint256)) public balances;

    address private transferProxy;
    address private genesis;

    function setTransferProxy(address _transferProxy) external {
        if(transferProxy == address(0))
            transferProxy = _transferProxy;
    }
    
    function setGenesis(address _genesis) external {
        if(genesis == address(0))
            genesis = _genesis;
    }

    function withdraw(
        address tokenAddress,
        address to,
        uint256 quantity
    )
        public
    {
        require(msg.sender == genesis);

        if (quantity > 0) {

            ERC20 token = ERC20(tokenAddress);

            uint256 currentTreasuryBalance = token.balanceOf(address(this));

            token.transfer(to, quantity);

            uint256 newTreasuryBalance = token.balanceOf(address(this));

            require(
                newTreasuryBalance == currentTreasuryBalance.sub(quantity),
                "Treasury.withdraw: Invalid post withdraw balance"
            );            
        }
    }



    function removeTokens(
        address tokenAddress,
        address owner,
        uint256 quantity
    )
        public
    {
        require(msg.sender == genesis);
        
        require(
            balances[tokenAddress][owner] >= quantity,
            "Treasury.removeTokens: Insufficient token balance"
        );

        if (quantity > 0) {
            balances[tokenAddress][owner] = balances[tokenAddress][owner].sub(quantity);    
        }
    }

    function transferBalance(
        address tokenAddress,
        address from,
        address to,
        uint256 quantity
    )
        public
    {
        require(msg.sender == genesis);
        
        if (quantity > 0) {
            require(
                balances[tokenAddress][from] >= quantity,
                "Treasury.transferBalance: Insufficient token balance"
            );

            balances[tokenAddress][from] = balances[tokenAddress][from].sub(quantity);

            balances[tokenAddress][to] = balances[tokenAddress][to].add(quantity);
        }
    }

    function addTokensBatch(
        address[] calldata tokens,
        address owner,
        uint256[] calldata quantities
    )
        external
    {
        require(msg.sender == transferProxy);

        uint256 tokenCount = tokens.length;

        require(
            tokenCount > 0,
            "Treasury.addTokensBatch: Tokens must not be empty"
        );

        require(
            tokenCount == quantities.length,
            "Treasury.addTokensBatch: Tokens and quantities lengths mismatch"
        );

        for (uint256 i = 0; i < tokenCount; i++) {
            addTokens(
                tokens[i],
                owner,
                quantities[i]
            );
        }
    }

    function addTokens(
        address tokenAddress,
        address owner,
        uint256 quantity
    )
        private
    {
        require(msg.sender == transferProxy);

        if (quantity > 0) {
            balances[tokenAddress][owner] = balances[tokenAddress][owner].add(quantity);
        }
    }

    function removeTokensBatch(
        address[] calldata tokens,
        address owner,
        uint256[] calldata quantities
    )
        external
    {
        require(msg.sender == genesis);

        uint256 tokenCount = tokens.length;

        require(
            tokenCount > 0,
            "Treasury.decrementTokensBatch: Tokens must not be empty"
        );

        require(
            tokenCount == quantities.length,
            "Treasury.decrementTokensBatch: Tokens and quantities lengths mismatch"
        );

        for (uint256 i = 0; i < tokenCount; i++) {
            removeTokens(
                tokens[i],
                owner,
                quantities[i]
            );
        }
    }

    function transferBalanceBatch(
        address[] calldata tokens,
        address from,
        address to,
        uint256[] calldata quantities
    )
        external
    {
        require(msg.sender == genesis);

        uint256 tokenCount = tokens.length;

        require(
            tokenCount > 0,
            "Treasury.transferBalanceBatch: Tokens must not be empty"
        );

        require(
            tokenCount == quantities.length,
            "Treasury.transferBalanceBatch: Tokens and quantities lengths mismatch"
        );

        for (uint256 i = 0; i < tokenCount; i++) {
            transferBalance(
                tokens[i],
                from,
                to,
                quantities[i]
            );
        }
    }

    function getOwnerBalance(
        address tokenAddress,
        address owner
    )
        external
        view
        returns (uint256)
    {
        return balances[tokenAddress][owner];
    }
}