const GenesisCoffer = artifacts.require("GenesisCoffer");
const Genesis = artifacts.require("Genesis");
const Erc20Mocked = artifacts.require("Erc20Mocked");
const Treasury = artifacts.require("Treasury");
const GenesisProgram = artifacts.require("GenesisProgram");
const TransferProxy = artifacts.require("TransferProxy");

contract("Genesis", async accounts => {
  
  let genesis;
  let weth;
  let treasury;
  let transferProxy;
  let managerAccount = accounts[0];
  let investorFirst = accounts[1];
  
  before('should init program', async () => {
    genesis = await Genesis.deployed();
    weth = await Erc20Mocked.deployed();
    treasury = await Treasury.deployed();
    transferProxy = await TransferProxy.deployed();
  });

  it("should create program", async () => {
    let whiteList = [weth.address];
    let quantities = [1000];

    await weth.deposit(managerAccount, 1000);
    await weth.approve(transferProxy.address, 1000, { from: managerAccount });

    await transferProxy.batchDeposit(whiteList, quantities, { from: managerAccount });

    let accountBalance = await treasury.getOwnerBalance(weth.address, managerAccount);
    assert.equal(1000, accountBalance);

    // Test create program
    let programAddress = await genesis.createProgram("testProgram", "GVTEST", whiteList, 1000, 1, { from: managerAccount });

    let realProgramAddress = programAddress.logs[programAddress.logs.length - 1].args

    var program = await GenesisProgram.at(realProgramAddress.text);
    let assets = [weth.address];
    await program.init(assets);
    
    let supply = await program.totalSupply.call();
    assert.equal(supply, 1000000);

    let managerAmount = await program.balanceOf.call(managerAccount);
    assert.equal(1000000 - 100, managerAmount.valueOf());

    accountBalance = await treasury.getOwnerBalance(weth.address, managerAccount);
    assert.equal(0, accountBalance.valueOf());

    accountBalance = await treasury.getOwnerBalance(weth.address, realProgramAddress.text);
    assert.equal(1000, accountBalance.valueOf());
  });

  it("should issue 1 000 000 and redeem 500 000 tokens by manager", async () => {
    let whiteList = [weth.address];
    let quantities = [1000];

    await weth.deposit(managerAccount, 1000);
    await weth.approve(transferProxy.address, 1000, { from: managerAccount });

    await transferProxy.batchDeposit(whiteList, quantities, { from: managerAccount });

    let programAddress = await genesis.createProgram("testProgram", "GVTEST", whiteList, 1000, 1, { from: managerAccount });
    let realProgramAddress = programAddress.logs[programAddress.logs.length - 1].args
    var program = await GenesisProgram.at(realProgramAddress.text);
    let assets = [weth.address];
    await program.init(assets);

    // Test issue tokens by manager
    await weth.deposit(managerAccount, 1000);
    await weth.approve(transferProxy.address, 1000, { from: managerAccount });

    await transferProxy.batchDeposit(whiteList, quantities, { from: managerAccount });

    accountBalance = await treasury.getOwnerBalance(weth.address, managerAccount);
    assert.equal(1000, accountBalance);

    await genesis.issue(realProgramAddress.text, 1000000, { from: managerAccount });

    supply = await program.totalSupply.call();
    assert.equal(supply, 2000000);

    managerAmount = await program.balanceOf.call(managerAccount);
    assert.equal(2000000  - 100, managerAmount.valueOf());

    accountBalance = await treasury.getOwnerBalance(weth.address, managerAccount);
    assert.equal(0, accountBalance.valueOf());

    accountBalance = await treasury.getOwnerBalance(weth.address, realProgramAddress.text);
    assert.equal(2000, accountBalance.valueOf());

    //Test redeem tokens by manager
    await genesis.redeem(realProgramAddress.text, 500000, { from: managerAccount });

    supply = await program.totalSupply.call();
    assert.equal(supply, 1500000);

    managerAmount = await program.balanceOf.call(managerAccount);
    assert.equal(1500000 - 100, managerAmount.valueOf());

    accountBalance = await treasury.getOwnerBalance(weth.address, managerAccount);
    assert.equal(500, accountBalance.valueOf());

    accountBalance = await treasury.getOwnerBalance(weth.address, realProgramAddress.text);
    assert.equal(1500, accountBalance.valueOf());
  });

  it("should issue 1 000 000 by manager and 2 000 000 by investor", async () => {
    let whiteList = [weth.address];
    let quantities = [1000];

    await weth.deposit(managerAccount, 1000);
    await weth.approve(transferProxy.address, 1000, { from: managerAccount });

    await transferProxy.batchDeposit(whiteList, quantities, { from: managerAccount });

    let programAddress = await genesis.createProgram("testProgram", "GVTEST", whiteList, 1000, 1, { from: managerAccount });
    let realProgramAddress = programAddress.logs[programAddress.logs.length - 1].args
    var program = await GenesisProgram.at(realProgramAddress.text);
    let assets = [weth.address];
    await program.init(assets);

    // Test issue tokens by investor
    let investorQuantities = [2000];
    await weth.deposit(investorFirst, 2000);
    await weth.approve(transferProxy.address, 2000, { from: investorFirst });

    await transferProxy.batchDeposit(whiteList, investorQuantities, { from: investorFirst });

    accountBalance = await treasury.getOwnerBalance(weth.address, investorFirst);
    assert.equal(2000, accountBalance);

    await genesis.issue(realProgramAddress.text, 2000000, { from: investorFirst });

    supply = await program.totalSupply.call();
    assert.equal(supply, 3000000);

    managerAmount = await program.balanceOf.call(managerAccount);
    assert.equal(1000000  - 100, managerAmount.valueOf());

    investorAmount = await program.balanceOf.call(investorFirst);
    assert.equal(2000000, investorAmount.valueOf());

    accountBalance = await treasury.getOwnerBalance(weth.address, investorFirst);
    assert.equal(0, accountBalance.valueOf());

    accountBalance = await treasury.getOwnerBalance(weth.address, realProgramAddress.text);
    assert.equal(3000, accountBalance.valueOf());
  });

  it("should issue 1 000 000 by manager and 333 333 by investor", async () => {
    let whiteList = [weth.address];
    let quantities = [1000];

    await weth.deposit(managerAccount, 1000);
    await weth.approve(transferProxy.address, 1000, { from: managerAccount });

    await transferProxy.batchDeposit(whiteList, quantities, { from: managerAccount });

    let programAddress = await genesis.createProgram("testProgram", "GVTEST", whiteList, 1000, 1, { from: managerAccount });
    let realProgramAddress = programAddress.logs[programAddress.logs.length - 1].args
    var program = await GenesisProgram.at(realProgramAddress.text);
    let assets = [weth.address];
    await program.init(assets);

    // Test issue tokens by investor
    let investorQuantities = [2000];
    await weth.deposit(investorFirst, 2000);
    await weth.approve(transferProxy.address, 2000, { from: investorFirst });

    await transferProxy.batchDeposit(whiteList, investorQuantities, { from: investorFirst });

    await genesis.issue(realProgramAddress.text, 333333, { from: investorFirst });

    supply = await program.totalSupply.call();
    assert.equal(supply, 1333333);

    managerAmount = await program.balanceOf.call(managerAccount);
    assert.equal(1000000 - 100, managerAmount.valueOf());

    investorAmount = await program.balanceOf.call(investorFirst);
    assert.equal(333333, investorAmount.valueOf());

    accountBalance = await treasury.getOwnerBalance(weth.address, investorFirst);
    assert.equal(1666, accountBalance.valueOf());

    accountBalance = await treasury.getOwnerBalance(weth.address, realProgramAddress.text);
    assert.equal(1334, accountBalance.valueOf());
  });

  it("should issue 1 000 000 by manager and redeem 333 333", async () => {
    let whiteList = [weth.address];
    let quantities = [1000];

    await weth.deposit(accounts[2], 1000);
    await weth.approve(transferProxy.address, 1000, { from: accounts[2] });

    await transferProxy.batchDeposit(whiteList, quantities, { from: accounts[2] });

    let programAddress = await genesis.createProgram("testProgram", "GVTEST", whiteList, 1000, 1, { from: accounts[2] });
    let realProgramAddress = programAddress.logs[programAddress.logs.length - 1].args
    var program = await GenesisProgram.at(realProgramAddress.text);
    let assets = [weth.address];

    await program.init(assets);


    // Test redeem tokens by manager
    await genesis.redeem(realProgramAddress.text, 333333, { from: accounts[2] });

    let supply = await program.totalSupply.call();
    assert.equal(supply, 666667);

    let managerAmount = await program.balanceOf.call(accounts[2]);
    assert.equal(666667  - 100, managerAmount.valueOf());

    let accountBalance = await treasury.getOwnerBalance(weth.address, accounts[2]);
    assert.equal(333, accountBalance.valueOf());

    accountBalance = await treasury.getOwnerBalance(weth.address, realProgramAddress.text);
    assert.equal(667, accountBalance.valueOf());
  });
});