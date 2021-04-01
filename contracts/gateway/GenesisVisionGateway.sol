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

import "../lib/AdminOperatorAccess.sol";

contract GenesisVisionGateway is AdminOperatorAccess {

    enum RequestStatus { InProcess, Processed, Cancelled }
    enum AssetType { Program, Fund}

    struct Asset {
        string id;
        AssetType assetType;
    }

    struct InvestRequest {
        string assetId;
        address addr;
        uint amount;
        RequestStatus status;
    }

    struct WithdrawalRequest {
        string assetId;
        address addr;
        uint8 percent;
        RequestStatus status;
    }

    event AssetAdded(string assetId, AssetType assetType);
    event AssetRemoved(string assetId);

    event NewInvestRequest(string assetId, address addr, uint amount, uint index);
    event InvestRequestNewStatus(uint requestIndex, RequestStatus newStatus);

    event NewWithdrawalRequest(string assetId, address addr, uint8 percent, uint index);

    mapping(string => Asset) public assets;
    mapping(uint => InvestRequest) investRequests;
    mapping(uint => WithdrawalRequest) withdrawalRequests;

    uint private investRequestIndex;
    uint private withdrawalRequestIndex;

    mapping(address => uint) public availableForWithdrawal;


    address payable whitelistedWallet;

    function addAsset(string calldata assetId, AssetType assetType) external onlyOperator {
        Asset storage newAsset = assets[assetId];

        newAsset.id = assetId;
        newAsset.assetType = assetType;

        emit AssetAdded(assetId, assetType);
    }

    function removeAsset(string calldata assetId) external onlyOperator {
        delete assets[assetId];

        emit AssetRemoved(assetId);
    }

    function investRequest(string memory assetId) public payable {
        InvestRequest memory request = InvestRequest({assetId: assetId, addr: msg.sender, amount: msg.value, status: RequestStatus.InProcess });
        investRequests[investRequestIndex] = request;
        emit NewInvestRequest(assetId, msg.sender, msg.value, investRequestIndex);
        investRequestIndex++;
    }

    function withdrawalRequest(string memory fundId, uint8 percent) public {
        WithdrawalRequest memory request = WithdrawalRequest({assetId: fundId, addr: msg.sender, percent: percent, status: RequestStatus.InProcess });
        withdrawalRequests[withdrawalRequestIndex] = request;
        emit NewWithdrawalRequest(fundId, msg.sender, percent, withdrawalRequestIndex);
        withdrawalRequestIndex++;
    }

    function withdrawByAdmin(uint256 amount) public onlyAdmin {
        require(amount <= address(this).balance);
        require(whitelistedWallet != address(0));
        whitelistedWallet.transfer(amount);
    }

    function setInvestRequestStatusProcessed(uint index) external onlyOperator {
        require(investRequests[index].status == RequestStatus.InProcess);
        investRequests[index].status = RequestStatus.Processed;
        emit InvestRequestNewStatus(index, RequestStatus.Processed);
    }
    function setInvestRequestStatusCancelled(uint index) external onlyOperator {
        require(investRequests[index].status == RequestStatus.InProcess);
        investRequests[index].status = RequestStatus.Cancelled;
        emit InvestRequestNewStatus(index, RequestStatus.Cancelled);
    }

    function setWithdrawalRequestStatusProcessed(uint index, uint amount) external onlyOperator {
        require(withdrawalRequests[index].status == RequestStatus.InProcess);
        withdrawalRequests[index].status = RequestStatus.Processed;
        availableForWithdrawal[withdrawalRequests[index].addr] += amount;
    }

    function withdraw(uint amount) external {
        require(amount <= availableForWithdrawal[msg.sender]);
        payable(msg.sender).transfer(amount);
    }
}