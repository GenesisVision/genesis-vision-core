const { expect } = require("chai");

const GenesisFundContract = require('../../build/contracts/GenesisFund');

describe("Genesis Funds Tests", () => {
  
  let genesis;
  let weth;
  let treasury;
  let transferProxy;
  let managerAccount;
  let investorFirst;
  let investorSecond;
  
  before('should init fund tests', async () => {
    let Erc20MockedFactory = await ethers.getContractFactory("Erc20Mocked");
    let Erc20Mocked = await Erc20MockedFactory.deploy("Weth test", "WETH");
    weth = await Erc20Mocked.deployed();

    let TreasuryFactory = await ethers.getContractFactory("Treasury");
    let Treasury = await TreasuryFactory.deploy();
    treasury = await Treasury.deployed();

    let GenesisFundsFactoryFactory = await ethers.getContractFactory("GenesisFundsFactory");
    let GenesisFundsFactory = await GenesisFundsFactoryFactory.deploy();
    let genesisFundsFactory = await GenesisFundsFactory.deployed();

    let GenesisAssetsFactoryFactory = await ethers.getContractFactory("GenesisAssetsFactory");
    let GenesisAssetsFactory = await GenesisAssetsFactoryFactory.deploy();
    let genesisAssetsFactory = await GenesisAssetsFactory.deployed();
    genesisAssetsFactory.setFundsFactory(genesisFundsFactory.address);
    
    let GenesisFactory = await ethers.getContractFactory("Genesis");
    let Genesis = await GenesisFactory.deploy(treasury.address);
    genesis = await Genesis.deployed();
    genesis.setAssetsFactory(genesisAssetsFactory.address);

    let TransferProxyFactory = await ethers.getContractFactory("TransferProxy");
    let TransferProxy = await TransferProxyFactory.deploy(treasury.address);
    transferProxy = await TransferProxy.deployed();

    const [addr1, addr2, addr3] = await ethers.getSigners();
    managerAccount = addr1;
    investorFirst = addr2;
    investorSecond = addr3;
  });

  it("should create fund", async () => {
    let whiteList = [weth.address];
    let quantities = [1000];
    await weth.deposit(managerAccount.address, 1000);
    await weth.connect(managerAccount).approve(transferProxy.address, 1000);

    await transferProxy.connect(managerAccount).batchDeposit(whiteList, quantities);
    let accountBalance = await treasury.getOwnerBalance(weth.address, managerAccount.address);

    expect(accountBalance).to.equal(1000);
    // // Test create fund
    await genesis.connect(managerAccount).setRequiredAssetAddress(weth.address);

    let fundAddress = await genesis.connect(managerAccount).createFund("testFund", "GVTEST", whiteList, 1000, 1);
    let res = await fundAddress.wait();

    let realFundAddress = res.logs[res.logs.length - 2].address;

    let fund = new ethers.Contract(realFundAddress, GenesisFundContract.abi, ethers.getDefaultProvider());

    let assets = [weth.address];

    await fund.connect(managerAccount).init(assets);
    
    let supply = await fund.connect(managerAccount).totalSupply.call();
    expect(supply).to.equal(1000000);

    let managerAmount = await fund.connect(managerAccount).balanceOf(managerAccount.address);
    expect(managerAmount).to.equal(1000000 - 100);

    accountBalance = await treasury.getOwnerBalance(weth.address, managerAccount.address);
    expect(accountBalance).to.equal(0);

    accountBalance = await treasury.getOwnerBalance(weth.address, realFundAddress);
    expect(accountBalance).to.equal(1000);
  });
  it("should issue 1 000 000 and redeem 500 000 tokens by manager", async () => {
    let whiteList = [weth.address];
    let quantities = [1000];

    await weth.deposit(managerAccount.address, 1000);
    await weth.connect(managerAccount).approve(transferProxy.address, 1000);

    await transferProxy.connect(managerAccount).batchDeposit(whiteList, quantities);
    await genesis.connect(managerAccount).setRequiredAssetAddress(weth.address);

    let fundAddress = await genesis.connect(managerAccount).createFund("testFund", "GVTEST", whiteList, 1000, 1);
    let res = await fundAddress.wait();

    let realFundAddress = res.logs[res.logs.length - 1].data.replace("0x000000000000000000000000", "0x");

    let fund = new ethers.Contract(realFundAddress, GenesisFundContract.abi, ethers.getDefaultProvider());

    let assets = [weth.address];
    await fund.connect(managerAccount).init(assets);

    // Test issue tokens by manager
    await weth.deposit(managerAccount.address, 1000);
    await weth.connect(managerAccount).approve(transferProxy.address, 1000);

    await transferProxy.connect(managerAccount).batchDeposit(whiteList, quantities);

    accountBalance = await treasury.getOwnerBalance(weth.address, managerAccount.address);
    expect(accountBalance).to.equal(1000);

    await genesis.connect(managerAccount).issue(realFundAddress, 1000000);

    supply = await fund.connect(managerAccount).totalSupply.call();
    expect(supply).to.equal(2000000);

    managerAmount = await fund.connect(managerAccount).balanceOf(managerAccount.address);
    expect(managerAmount.valueOf()).to.equal(2000000  - 100);

    accountBalance = await treasury.getOwnerBalance(weth.address, managerAccount.address);
    expect(accountBalance.valueOf()).to.equal(0);

    accountBalance = await treasury.getOwnerBalance(weth.address, realFundAddress);
    expect(accountBalance.valueOf()).to.equal(2000);

    //Test redeem tokens by manager
    await genesis.connect(managerAccount).redeem(realFundAddress, 500000);

    supply = await fund.connect(managerAccount).totalSupply.call();
    expect(supply.valueOf()).to.equal(1500000);

    managerAmount = await fund.connect(managerAccount).balanceOf(managerAccount.address);
    expect(managerAmount.valueOf()).to.equal(1500000 - 100);

    accountBalance = await treasury.getOwnerBalance(weth.address, managerAccount.address);
    expect(accountBalance.valueOf()).to.equal(500);

    accountBalance = await treasury.getOwnerBalance(weth.address, realFundAddress);
    expect(accountBalance.valueOf()).to.equal(1500);
  });

  it("should issue 1 000 000 by manager and 2 000 000 by investor", async () => {
    let whiteList = [weth.address];
    let quantities = [1000];

    await weth.deposit(managerAccount.address, 1000);
    await weth.connect(managerAccount).approve(transferProxy.address, 1000);

    await transferProxy.connect(managerAccount).batchDeposit(whiteList, quantities);

    await genesis.connect(managerAccount).setRequiredAssetAddress(weth.address);

    let fundAddress = await genesis.connect(managerAccount).createFund("testFund", "GVTEST", whiteList, 1000, 1);
    let res = await fundAddress.wait();

    let realFundAddress = res.logs[res.logs.length - 1].data.replace("0x000000000000000000000000", "0x");

    let fund = new ethers.Contract(realFundAddress, GenesisFundContract.abi, ethers.getDefaultProvider());

    let assets = [weth.address];
    await fund.connect(managerAccount).init(assets);

    // Test issue tokens by investor
    let investorQuantities = [2000];
    await weth.deposit(investorFirst.address, 2000);
    await weth.connect(investorFirst).approve(transferProxy.address, 2000);

    await transferProxy.connect(investorFirst).batchDeposit(whiteList, investorQuantities);

    accountBalance = await treasury.getOwnerBalance(weth.address, investorFirst.address);
    expect(accountBalance.valueOf()).to.equal(2000);

    await genesis.connect(investorFirst).issue(realFundAddress, 2000000);

    supply = await fund.connect(managerAccount).totalSupply.call();
    expect(supply).to.equal(3000000);

    managerAmount = await fund.connect(managerAccount).balanceOf(managerAccount.address);
    expect(managerAmount.valueOf()).to.equal(1000000  - 100);

    investorAmount = await fund.connect(managerAccount).balanceOf(investorFirst.address);
    expect(investorAmount.valueOf()).to.equal(2000000);

    accountBalance = await treasury.getOwnerBalance(weth.address, investorFirst.address);
    expect(accountBalance.valueOf()).to.equal(0);

    accountBalance = await treasury.getOwnerBalance(weth.address, realFundAddress);
    expect(accountBalance.valueOf()).to.equal(3000);
  });

  it("should issue 1 000 000 by manager and 333 333 by investor", async () => {
    let whiteList = [weth.address];
    let quantities = [1000];

    await weth.deposit(managerAccount.address, 1000);
    await weth.connect(managerAccount).approve(transferProxy.address, 1000);

    await transferProxy.connect(managerAccount).batchDeposit(whiteList, quantities);

    await genesis.connect(managerAccount).setRequiredAssetAddress(weth.address);

    let fundAddress = await genesis.connect(managerAccount).createFund("testFund", "GVTEST", whiteList, 1000, 1);
    let res = await fundAddress.wait();

    let realFundAddress = res.logs[res.logs.length - 1].data.replace("0x000000000000000000000000", "0x");

    let fund = new ethers.Contract(realFundAddress, GenesisFundContract.abi, ethers.getDefaultProvider());

    let assets = [weth.address];
    await fund.connect(managerAccount).init(assets);

    // Test issue tokens by investor
    let investorQuantities = [2000];
    await weth.deposit(investorFirst.address, 2000);
    await weth.connect(investorFirst).approve(transferProxy.address, 2000);

    await transferProxy.connect(investorFirst).batchDeposit(whiteList, investorQuantities);

    await genesis.connect(investorFirst).issue(realFundAddress, 333333);

    supply = await fund.connect(managerAccount).totalSupply.call();
    expect(supply).to.equal(1333333);

    managerAmount = await fund.connect(managerAccount).balanceOf(managerAccount.address);
    expect(managerAmount.valueOf()).to.equal(1000000 - 100);

    investorAmount = await fund.connect(managerAccount).balanceOf(investorFirst.address);
    expect(investorAmount.valueOf()).to.equal(333333);

    accountBalance = await treasury.getOwnerBalance(weth.address, investorFirst.address);
    expect(accountBalance.valueOf()).to.equal(1666);

    accountBalance = await treasury.getOwnerBalance(weth.address, realFundAddress);
    expect(accountBalance.valueOf()).to.equal(1334);

  });

  it("should issue 1 000 000 by manager and redeem 333 333", async () => {
    let whiteList = [weth.address];
    let quantities = [1000];

    await weth.deposit(investorSecond.address, 1000);
    await weth.connect(investorSecond).approve(transferProxy.address, 1000);

    await transferProxy.connect(investorSecond).batchDeposit(whiteList, quantities);

    await genesis.connect(managerAccount).setRequiredAssetAddress(weth.address);

    let fundAddress = await genesis.connect(investorSecond).createFund("testFund", "GVTEST", whiteList, 1000, 1);
    let res = await fundAddress.wait();

    let realFundAddress = res.logs[res.logs.length - 1].data.replace("0x000000000000000000000000", "0x");

    let fund = new ethers.Contract(realFundAddress, GenesisFundContract.abi, ethers.getDefaultProvider());

    let assets = [weth.address];
    await fund.connect(managerAccount).init(assets);

    //Test redeem tokens by manager
    await genesis.connect(investorSecond).redeem(realFundAddress, 333333);

    let supply = await fund.connect(managerAccount).totalSupply.call();
    expect(supply).to.equal(666667);

    let managerAmount = await fund.connect(managerAccount).balanceOf(investorSecond.address);
    expect(managerAmount.valueOf()).to.equal(666667  - 100);

    let accountBalance = await treasury.getOwnerBalance(weth.address, investorSecond.address);
    expect(accountBalance.valueOf()).to.equal(333);

    accountBalance = await treasury.getOwnerBalance(weth.address, realFundAddress);
    expect(accountBalance.valueOf()).to.equal(667);
  });
});