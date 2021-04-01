const GenesisCoffer = artifacts.require("GenesisCoffer");
const Genesis = artifacts.require("Genesis");
const Erc20Mocked = artifacts.require("Erc20Mocked");
const Treasury = artifacts.require("Treasury");
const GenesisProgram = artifacts.require("GenesisProgram");
const TransferProxy = artifacts.require("TransferProxy");

const timeTravel = require('../helpers/timeTravel');


contract("GenesisCoffer minimal initial supply", async accounts => {
    it("[Minimum] should be 1000", async () => {
      let instance = await GenesisCoffer.deployed();
      let supply = await instance.totalSupply.call();
      //console.log(supply.toNumber());
      assert.equal(supply, 1000);

      let managerBalance = await instance.balanceOf.call(accounts[0]);
      assert.equal(managerBalance, 0);
      let cofferBalance = await instance.balanceOf.call(instance.address);
      assert.equal(cofferBalance, 1000);
    });
});

contract("GenesisCoffer management fee", async accounts => {
  it("[Minimum] should be 0 after launch", async () => {
    let instance = await GenesisCoffer.deployed();
    await instance.ClaimManagementFee();
    let supply = await instance.totalSupply.call();
    assert.equal(supply, 1000);
    let managerBalance = await instance.balanceOf.call(accounts[0]);
    assert.equal(managerBalance, 0);
    let cofferBalance = await instance.balanceOf.call(instance.address);
    assert.equal(cofferBalance, 1000);
  });
});

contract("GenesisCoffer management fee", async accounts => {
  it("[Minimum] should be 0 forever", async () => {
    let instance = await GenesisCoffer.deployed();
    await timeTravel.increaseTime(60 * 60 * 24 * 500);

    await instance.ClaimManagementFee();
    let supply = await instance.totalSupply.call();
    assert.equal(supply, 1000);
    let managerBalance = await instance.balanceOf.call(accounts[0]);
    assert.equal(managerBalance, 0);
    let cofferBalance = await instance.balanceOf.call(instance.address);
    assert.equal(cofferBalance, 1000);
  });
});

  contract("GenesisCoffer investment", async accounts => {
    it("[Investment] should be 3000", async () => {
      let instance = await GenesisCoffer.deployed();
      let weth = await Erc20Mocked.deployed();
      let treasury = await Treasury.deployed();
      let transferProxy = await TransferProxy.deployed();
      let genesis = await Genesis.deployed();
      let whiteList = [weth.address];
  

      await instance.init(whiteList);
      
      let supply = await instance.totalSupply.call();
      assert.equal(supply, 1000);
      let managerBalance = await instance.balanceOf.call(accounts[0]);
      assert.equal(managerBalance, 0);
      let cofferBalance = await instance.balanceOf.call(instance.address);
      assert.equal(cofferBalance, 1000);

      let investorQuantities = [2000];
      await weth.deposit(accounts[1], 2000);
      await weth.approve(transferProxy.address, 2000, { from: accounts[1] });
  
      await transferProxy.batchDeposit(whiteList, investorQuantities, { from: accounts[1] });
  
      let accountBalance = await treasury.getOwnerBalance(weth.address, accounts[1]);
      assert.equal(2000, accountBalance);

      await genesis.issue(instance.address, 2000, { from: accounts[1] });
  
      supply = await instance.totalSupply.call();
      assert.equal(supply, 3000);
    });
});

contract("GenesisCoffer investment", async accounts => {
  it("[Investment] Management fee should be 200", async () => {
    let instance = await GenesisCoffer.deployed();
    let weth = await Erc20Mocked.deployed();
    let treasury = await Treasury.deployed();
    let transferProxy = await TransferProxy.deployed();
    let genesis = await Genesis.deployed();
    let whiteList = [weth.address];


    await instance.init(whiteList);

    let investorQuantities = [2000];
    await weth.deposit(accounts[1], 2000);
    await weth.approve(transferProxy.address, 2000, { from: accounts[1] });

    await transferProxy.batchDeposit(whiteList, investorQuantities, { from: accounts[1] });

    await genesis.issue(instance.address, 2000, { from: accounts[1] });

    await timeTravel.increaseTime(60 * 60 * 24 * 365);

    await instance.ClaimManagementFee();

    let managerBalance = await instance.balanceOf.call(accounts[0]);
    assert.equal(managerBalance, 200);
  });
});

contract("GenesisCoffer investment", async accounts => {
  it("[Investment] Management fee should be 420", async () => {
    let instance = await GenesisCoffer.deployed();
    let weth = await Erc20Mocked.deployed();
    let treasury = await Treasury.deployed();
    let transferProxy = await TransferProxy.deployed();
    let genesis = await Genesis.deployed();
    let whiteList = [weth.address];


    await instance.init(whiteList);

    let investorQuantities = [2000];
    await weth.deposit(accounts[1], 2000);
    await weth.approve(transferProxy.address, 2000, { from: accounts[1] });

    await transferProxy.batchDeposit(whiteList, investorQuantities, { from: accounts[1] });

    await genesis.issue(instance.address, 2000, { from: accounts[1] });

    await timeTravel.increaseTime(60 * 60 * 24 * 365);
    await instance.ClaimManagementFee();

    await timeTravel.increaseTime(60 * 60 * 24 * 365);
    await instance.ClaimManagementFee();

    let managerBalance = await instance.balanceOf.call(accounts[0]);
    assert.equal(managerBalance, 420);
  });
});