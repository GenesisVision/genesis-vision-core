const truffleAssert = require('truffle-assertions');

const GenesisVisionGateway = artifacts.require("GenesisVisionGateway");


contract("GenesisVisionGateway", async accounts => {

    beforeEach(async () => {
        let gateway = await GenesisVisionGateway.deployed();
        await gateway.setOperator(accounts[1]);
    });

    it("should add asset", async () => {
        let gateway = await GenesisVisionGateway.deployed();
        let tx = await gateway.addAsset(1, 0, {from: accounts[1]});
        
        truffleAssert.eventEmitted(tx, 'AssetAdded', (ev) => {
            return ev.assetId.toNumber() === 1 && ev.assetType.toNumber() === 0;
        });
    });

    it("should remove asset", async () => {
        let gateway = await GenesisVisionGateway.deployed();
        let tx = await gateway.removeAsset(1, {from: accounts[1]});
        
        truffleAssert.eventEmitted(tx, 'AssetRemoved', (ev) => {
            return ev.assetId.toNumber() === 1;
        });
    });

    it("should add invest request", async () => {
        let gateway = await GenesisVisionGateway.deployed();
        await gateway.addAsset(2, 0, {from: accounts[1]});
        
        let tx = await gateway.investRequest(2, {from: accounts[2], value: 1})

        truffleAssert.eventEmitted(tx, 'NewInvestRequest', (ev) => {
            return ev.assetId.toNumber() === 2 && ev.addr === accounts[2] && ev.amount.toNumber() === 1;
        });

    });

});
