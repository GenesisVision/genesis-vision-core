const { expect } = require("chai");

// const GenesisCoffer = artifacts.require("GenesisCoffer");
// const Genesis = artifacts.require("Genesis");
// const Erc20Mocked = artifacts.require("Erc20Mocked");
// const Treasury = artifacts.require("Treasury");
// const GenesisProgram = artifacts.require("GenesisProgram");
// const TransferProxy = artifacts.require("TransferProxy");

const timeTravel = require('../helpers/timeTravel');

const initialCofferDeposit = 1000;
const cofferName = "";
const cofferTicker = "";
const cofferManagementFee = 10 * 100; // 10%
const minManagerInitialDeposit = 1000;

describe("GenesisCoffer minimal initial supply", () => {
    it("[Minimum] should be 1000", async () => {
      
      let GenesisCofferSettingsFactory = await ethers.getContractFactory("GenesisCofferSettings");
      let GenesisCofferSettings = await GenesisCofferSettingsFactory.deploy(1000);
      let genesisCofferSettings = await GenesisCofferSettings.deployed();

      let GenesisCofferFactory = await ethers.getContractFactory("GenesisCoffer");
      let GenesisCoffer = await GenesisCofferFactory
         .deploy(initialCofferDeposit, cofferName, cofferTicker, cofferManagementFee, genesisCofferSettings.address);
      let instance = await GenesisCoffer.deployed();

      let supply = await instance.totalSupply.call();
      expect(supply).to.equal(1000);

      const [addr1] = await ethers.getSigners();

      let managerBalance = await instance.balanceOf(addr1.address);
      expect(managerBalance).to.equal(0);

      let cofferBalance = await instance.balanceOf(instance.address);
      expect(cofferBalance).to.equal(1000);
    });
});

describe("GenesisCoffer management fee", () => {
  it("[Minimum] should be 0 after launch", async () => {
    let GenesisCofferSettingsFactory = await ethers.getContractFactory("GenesisCofferSettings");
    let GenesisCofferSettings = await GenesisCofferSettingsFactory.deploy(1000);
    let genesisCofferSettings = await GenesisCofferSettings.deployed();

    let GenesisCofferFactory = await ethers.getContractFactory("GenesisCoffer");
    let GenesisCoffer = await GenesisCofferFactory
       .deploy(initialCofferDeposit, cofferName, cofferTicker, cofferManagementFee, genesisCofferSettings.address);
    let instance = await GenesisCoffer.deployed();

    await instance.ClaimManagementFee();
    let supply = await instance.totalSupply.call();
    expect(supply).to.equal(1000);

    const [addr1] = await ethers.getSigners();

    let managerBalance = await instance.balanceOf(addr1.address);
    expect(managerBalance).to.equal(0);
    let cofferBalance = await instance.balanceOf(instance.address);
    expect(cofferBalance).to.equal(1000);
  });
});

describe("GenesisCoffer management fee", () => {
  it("[Minimum] should be 0 forever", async () => {
    let GenesisCofferSettingsFactory = await ethers.getContractFactory("GenesisCofferSettings");
    let GenesisCofferSettings = await GenesisCofferSettingsFactory.deploy(1000);
    let genesisCofferSettings = await GenesisCofferSettings.deployed();

    let GenesisCofferFactory = await ethers.getContractFactory("GenesisCoffer");
    let GenesisCoffer = await GenesisCofferFactory
       .deploy(initialCofferDeposit, cofferName, cofferTicker, cofferManagementFee, genesisCofferSettings.address);
    let instance = await GenesisCoffer.deployed();

    await timeTravel.increaseTime(60 * 60 * 24 * 500);

    await instance.ClaimManagementFee();
    let supply = await instance.totalSupply.call();
    expect(supply).to.equal(1000);

    const [addr1] = await ethers.getSigners();

    let managerBalance = await instance.balanceOf(addr1.address);
    expect(managerBalance).to.equal(0);
    let cofferBalance = await instance.balanceOf(instance.address);
    expect(cofferBalance).to.equal(1000);
  });
});

describe("GenesisCoffer investment", () => {
    it("[Investment] should be 3000", async () => {
      let GenesisCofferSettingsFactory = await ethers.getContractFactory("GenesisCofferSettings");
      let GenesisCofferSettings = await GenesisCofferSettingsFactory.deploy(1000);
      let genesisCofferSettings = await GenesisCofferSettings.deployed();
  
      let GenesisCofferFactory = await ethers.getContractFactory("GenesisCoffer");
      let GenesisCoffer = await GenesisCofferFactory
         .deploy(initialCofferDeposit, cofferName, cofferTicker, cofferManagementFee, genesisCofferSettings.address);
      let instance = await GenesisCoffer.deployed();
      
      let Erc20MockedFactory = await ethers.getContractFactory("Erc20Mocked");
      let Erc20Mocked = await Erc20MockedFactory.deploy("Weth test", "WETH");
      let weth = await Erc20Mocked.deployed();

      let TreasuryFactory = await ethers.getContractFactory("Treasury");
      let Treasury = await TreasuryFactory.deploy();
      let treasury = await Treasury.deployed();

      let GenesisFactory = await ethers.getContractFactory("Genesis");
      let Genesis = await GenesisFactory.deploy(treasury.address);
      let genesis = await Genesis.deployed();

      let TransferProxyFactory = await ethers.getContractFactory("TransferProxy");
      let TransferProxy = await TransferProxyFactory.deploy(treasury.address);
      let transferProxy = await TransferProxy.deployed();
      
      let whiteList = [weth.address];

      await instance.init(whiteList);
      
      let supply = await instance.totalSupply.call();
      expect(supply).to.equal(1000);
      const [addr1] = await ethers.getSigners();

      let managerBalance = await instance.balanceOf(addr1.address);
      expect(managerBalance).to.equal(0);
      let cofferBalance = await instance.balanceOf(instance.address);
      expect(cofferBalance).to.equal(1000);

      let investorQuantities = [2000];
      await weth.deposit(addr1.address, 2000);
      await weth.connect(addr1).approve(transferProxy.address, 2000);
  
      await transferProxy.connect(addr1).batchDeposit(whiteList, investorQuantities);
  
      let accountBalance = await treasury.getOwnerBalance(weth.address, addr1.address);
      expect(accountBalance).to.equal(2000);

      await genesis.connect(addr1).issue(instance.address, 2000);
  
      supply = await instance.totalSupply.call();
      expect(supply).to.equal(3000);
    });
});

describe("GenesisCoffer investment", () => {
  it("[Investment] Management fee should be 200", async () => {
    let GenesisCofferSettingsFactory = await ethers.getContractFactory("GenesisCofferSettings");
    let GenesisCofferSettings = await GenesisCofferSettingsFactory.deploy(1000);
    let genesisCofferSettings = await GenesisCofferSettings.deployed();

    let GenesisCofferFactory = await ethers.getContractFactory("GenesisCoffer");
    let GenesisCoffer = await GenesisCofferFactory
       .deploy(initialCofferDeposit, cofferName, cofferTicker, cofferManagementFee, genesisCofferSettings.address);
    let instance = await GenesisCoffer.deployed();
    
    let Erc20MockedFactory = await ethers.getContractFactory("Erc20Mocked");
    let Erc20Mocked = await Erc20MockedFactory.deploy("Weth test", "WETH");
    let weth = await Erc20Mocked.deployed();

    let TreasuryFactory = await ethers.getContractFactory("Treasury");
    let Treasury = await TreasuryFactory.deploy();
    let treasury = await Treasury.deployed();

    let GenesisFactory = await ethers.getContractFactory("Genesis");
    let Genesis = await GenesisFactory.deploy(treasury.address);
    let genesis = await Genesis.deployed();

    let TransferProxyFactory = await ethers.getContractFactory("TransferProxy");
    let TransferProxy = await TransferProxyFactory.deploy(treasury.address);
    let transferProxy = await TransferProxy.deployed();
    
    let whiteList = [weth.address];

    await instance.init(whiteList);

    const [owner, addr1] = await ethers.getSigners();


    let investorQuantities = [2000];
    await weth.deposit(addr1.address, 2000);
    await weth.connect(addr1).approve(transferProxy.address, 2000);

    await transferProxy.connect(addr1).batchDeposit(whiteList, investorQuantities);

    await genesis.connect(addr1).issue(instance.address, 2000);

    await timeTravel.increaseTime(60 * 60 * 24 * 365);

    await instance.ClaimManagementFee();

    let managerBalance = await instance.balanceOf(owner.address);
    expect(managerBalance).to.equal(200);
  });
});

describe("GenesisCoffer investment", () => {
  it("[Investment] Management fee should be 420", async () => {
    let GenesisCofferSettingsFactory = await ethers.getContractFactory("GenesisCofferSettings");
    let GenesisCofferSettings = await GenesisCofferSettingsFactory.deploy(1000);
    let genesisCofferSettings = await GenesisCofferSettings.deployed();

    let GenesisCofferFactory = await ethers.getContractFactory("GenesisCoffer");
    let GenesisCoffer = await GenesisCofferFactory
       .deploy(initialCofferDeposit, cofferName, cofferTicker, cofferManagementFee, genesisCofferSettings.address);
    let instance = await GenesisCoffer.deployed();
    
    let Erc20MockedFactory = await ethers.getContractFactory("Erc20Mocked");
    let Erc20Mocked = await Erc20MockedFactory.deploy("Weth test", "WETH");
    let weth = await Erc20Mocked.deployed();

    let TreasuryFactory = await ethers.getContractFactory("Treasury");
    let Treasury = await TreasuryFactory.deploy();
    let treasury = await Treasury.deployed();

    let GenesisFactory = await ethers.getContractFactory("Genesis");
    let Genesis = await GenesisFactory.deploy(treasury.address);
    let genesis = await Genesis.deployed();

    let TransferProxyFactory = await ethers.getContractFactory("TransferProxy");
    let TransferProxy = await TransferProxyFactory.deploy(treasury.address);
    let transferProxy = await TransferProxy.deployed();

    let whiteList = [weth.address];

    await instance.init(whiteList);
    const [owner, addr1] = await ethers.getSigners();

    let investorQuantities = [2000];
    await weth.deposit(addr1.address, 2000);
    await weth.connect(addr1).approve(transferProxy.address, 2000);

    await transferProxy.connect(addr1).batchDeposit(whiteList, investorQuantities);

    await genesis.connect(addr1).issue(instance.address, 2000);

    await timeTravel.increaseTime(60 * 60 * 24 * 365);
    await instance.ClaimManagementFee();

    await timeTravel.increaseTime(60 * 60 * 24 * 365);
    await instance.ClaimManagementFee();

    let managerBalance = await instance.balanceOf(owner.address);
    expect(managerBalance).to.equal(420);
  });
});