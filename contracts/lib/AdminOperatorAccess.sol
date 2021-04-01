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

abstract contract AdminOperatorAccess {
    address private admin;
    address private operator;

    event NewAdmin(address indexed previousAdmin, address indexed newAdmin);
    event NewOperator(address indexed previousOperator, address indexed newOperator);

    constructor () {
        address msgSender = msg.sender;
        admin = msgSender;
        emit NewAdmin(address(0), msgSender);
    }

    function getAdmin() public view virtual returns (address) {
        return admin;
    }

    function getOperator() public view virtual returns (address) {
        return operator;
    }

    modifier onlyAdmin() {
        require(getAdmin() == msg.sender, "AdminOperatorAccess: caller is not the admin");
        _;
    }

    modifier onlyOperator() {
        require(getOperator() == msg.sender, "AdminOperatorAccess: caller is not the operator");
        _;
    }
    
    function setAdmin(address newAdmin) public virtual onlyAdmin {
        require(newAdmin != address(0), "AdminOperatorAccess: new admin is the zero address");
        emit NewAdmin(admin, newAdmin);
        admin = newAdmin;
    }

    function setOperator(address newOperator) public virtual onlyAdmin {
        require(newOperator != address(0), "AdminOperatorAccess: new operator is the zero address");
        emit NewOperator(operator, newOperator);
        operator = newOperator;
    }
}