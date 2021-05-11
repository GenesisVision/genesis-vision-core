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
  
  before('should init fund', async () => {
    let Erc20MockedFactory = await ethers.getContractFactory("Erc20Mocked");
    let Erc20Mocked = await Erc20MockedFactory.deploy("Weth test", "WETH");
    weth = await Erc20Mocked.deployed();

    let TreasuryFactory = await ethers.getContractFactory("Treasury");
    let Treasury = await TreasuryFactory.deploy();
    treasury = await Treasury.deployed();

    let GenesisFactory = await ethers.getContractFactory("Genesis");
    let Genesis = await GenesisFactory.deploy(treasury.address);
    genesis = await Genesis.deployed();

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
    // // Test create program
    await genesis.connect(managerAccount).setRequiredAssetAddress(weth.address);

    let programAddress = await genesis.connect(managerAccount).createProgram("testProgram", "GVTEST", whiteList, 1000, 1);
    let res = await programAddress.wait();

    let realProgramAddress = res.logs[res.logs.length - 2].address;

    let program = new ethers.Contract(realProgramAddress, GenesisProgramContract.abi, ethers.getDefaultProvider());

    let assets = [weth.address];

    await program.connect(managerAccount).init(assets);
    
    let supply = await program.connect(managerAccount).totalSupply.call();
    expect(supply).to.equal(1000000);

    let managerAmount = await program.connect(managerAccount).balanceOf(managerAccount.address);
    expect(managerAmount).to.equal(1000000 - 100);

    accountBalance = await treasury.getOwnerBalance(weth.address, managerAccount.address);
    expect(accountBalance).to.equal(0);

    accountBalance = await treasury.getOwnerBalance(weth.address, realProgramAddress);
    expect(accountBalance).to.equal(1000);
  });
});