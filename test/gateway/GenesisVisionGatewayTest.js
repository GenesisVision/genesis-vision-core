const truffleAssert = require('truffle-assertions');

const GenesisVisionGateway = artifacts.require("GenesisVisionGateway");


contract("GenesisVisionGateway", async accounts => {

    beforeEach(async () => {
        let gateway = await GenesisVisionGateway.deployed();
        await gateway.setOperator(accounts[1]);
    });

    it("should add asset", async () => {
        let gateway = await GenesisVisionGateway.deployed();
        let tx = await gateway.addAsset("TestAsset1", 0, {from: accounts[1]});
        
        truffleAssert.eventEmitted(tx, 'AssetAdded', (ev) => {
            return ev.assetId === "TestAsset1" && ev.assetType.toNumber() === 0;
        });
    });

    it("should remove asset", async () => {
        let gateway = await GenesisVisionGateway.deployed();
        let tx = await gateway.removeAsset("TestAsset1", {from: accounts[1]});
        
        truffleAssert.eventEmitted(tx, 'AssetRemoved', (ev) => {
            return ev.assetId === "TestAsset1";
        });
    });

    it("should add invest request", async () => {
        let gateway = await GenesisVisionGateway.deployed();
        await gateway.addAsset("TestAsset2", 0, {from: accounts[1]});
        
        let tx = await gateway.investRequest("TestAsset2", {from: accounts[2], value: 1})

        truffleAssert.eventEmitted(tx, 'NewInvestRequest', (ev) => {
            return ev.assetId === "TestAsset2" && ev.addr === accounts[2] && ev.amount.toNumber() === 1;
        });

    });

});
