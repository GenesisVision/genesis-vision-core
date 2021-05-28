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

pragma solidity ^0.8.4;

import { AdminOperatorAccess } from "../lib/AdminOperatorAccess.sol";

interface IERC20 {
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract TokensBridge is AdminOperatorAccess {
    address public owner;
    IERC20 public token;

    event Collect(address indexed sender, uint256 amount);
    event Dispense(address indexed sender, uint256 amount);
    event TransferOwnership(address indexed previousOwner, address indexed newOwner);

    function collect(address _sender, uint256 _amount) public onlyOperator returns (bool success) {
        require(token.allowance(_sender, address(this)) >= _amount, "Amount check failed");
        require(token.transferFrom(_sender, address(this), _amount), "transferFrom() failure. Make sure that your balance is not lower than the allowance you set");
        emit Collect(_sender, _amount);
        return true;
    }

    function dispense(address _sender, uint256 _amount) public onlyOperator returns (bool success) {
        require(token.transfer(_sender, _amount), "transfer() failure. Contact contract owner");
        emit Dispense(_sender, _amount);
        return true;
    }

    constructor(IERC20 _token) {
        token = _token;
    }
}