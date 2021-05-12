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
    let fund = await createFund("testFund", "GVTEST", 1000);
    
    let supply = await fund.connect(managerAccount).totalSupply.call();
    expect(supply).to.equal(1000000);

    let managerAmount = await fund.connect(managerAccount).balanceOf(managerAccount.address);
    expect(managerAmount).to.equal(1000000 - 100);

    accountBalance = await treasury.getOwnerBalance(weth.address, managerAccount.address);
    expect(accountBalance).to.equal(0);

    accountBalance = await treasury.getOwnerBalance(weth.address, realFundAddress);
    expect(accountBalance).to.equal(1000);
  });


  it("should first relocate fund", async () => {
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
  
  async function createFund(name, ticket, initDeposit){
    let whiteList = [weth.address];
    let quantities = [initDeposit];
    await weth.deposit(managerAccount.address, initDeposit);
    await weth.connect(managerAccount).approve(transferProxy.address, initDeposit);

    await transferProxy.connect(managerAccount).batchDeposit(whiteList, quantities);
    let accountBalance = await treasury.getOwnerBalance(weth.address, managerAccount.address);

    expect(accountBalance).to.equal(initDeposit);
    // // Test create fund
    await genesis.connect(managerAccount).setRequiredAssetAddress(weth.address);

    let fundAddress = await genesis.connect(managerAccount).createFund(name, ticket, whiteList, initDeposit, 1);
    let res = await fundAddress.wait();

    let realFundAddress = res.logs[res.logs.length - 2].address;

    let fund = new ethers.Contract(realFundAddress, GenesisFundContract.abi, ethers.getDefaultProvider());

    let assets = [weth.address];

    await fund.connect(managerAccount).init(assets);

    return fund;
  }
});