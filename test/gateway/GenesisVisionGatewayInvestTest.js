const { expect } = require("chai");

describe("GenesisVisionGateway invest tests", () => {
  let gateway;

  beforeEach(async () => {
    let GenesisVisionGatewayFactory = await ethers.getContractFactory("GenesisVisionGateway");
    let GenesisVisionGateway = await GenesisVisionGatewayFactory.deploy();
    gateway = await GenesisVisionGateway.deployed();

    const [addr1] = await ethers.getSigners();
    await gateway.setOperator(addr1.address);
  });

  it("should add investment request", async () => {
    const [addr1] = await ethers.getSigners();

    await gateway.connect(addr1).addAsset(1, 0);
    await gateway.investRequest(1, { value: 1000 });

    let balance = await web3.eth.getBalance(gateway.address);
    expect(balance.valueOf()).to.equal("1000");
  });

  it("should emit new investment request event", async () => {
    const [addr1, addr2] = await ethers.getSigners();

    await gateway.connect(addr1).addAsset(2, 0);
    await expect(gateway.connect(addr2).investRequest(2, { value: 1000 }))
      .to.emit(gateway, 'NewInvestRequest')
      .withArgs(2, addr2.address, 1000, 0);
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

