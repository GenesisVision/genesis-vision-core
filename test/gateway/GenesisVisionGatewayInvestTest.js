const truffleAssert = require('truffle-assertions');

const GenesisVisionGateway = artifacts.require("GenesisVisionGateway");

contract("GenesisVisionGateway invest tests", async accounts => {

  beforeEach(async () => {
    let gateway = await GenesisVisionGateway.deployed();
    await gateway.setOperator(accounts[1]);
  });

  it("should add investment request", async () => {
    let gateway = await GenesisVisionGateway.deployed();
    await gateway.addAsset(1, 0, { from: accounts[1] });
    await gateway.investRequest(1, { value: 1000 });

    let balance = await web3.eth.getBalance(gateway.address);
    assert.equal(1000, balance.valueOf());
  });

  it("should emit new investment request event", async () => {
    let gateway = await GenesisVisionGateway.deployed();
    await gateway.addAsset(2, 0, { from: accounts[1] });
    let tx = await gateway.investRequest(2, { value: 1000, from: accounts[2] });

    truffleAssert.eventEmitted(tx, 'NewInvestRequest', (ev) => {
      return ev.assetId.toNumber() === 2 && ev.addr === accounts[2] && ev.amount.toNumber() === 1000 && ev.index.toNumber() === 1;
    });
  });

  // it("should emit new investment request status event", async () => {
  //   let gateway = await GenesisVisionGateway.deployed();
  //   await gateway.addAsset("testProgram3", 0, { from: accounts[1] });
  //   await gateway.investRequest("testProgram3", { value: 1000, from: accounts[2] });

  //   truffleAssert.eventEmitted(tx, 'NewInvestRequest', (ev) => {
  //     console.log(ev);
  //     return ev.assetId === 2 && ev.addr === accounts[2] && ev.amount.toNumber() === 1000 && ev.index.toNumber() === 2;
  //   });
  // });
});

