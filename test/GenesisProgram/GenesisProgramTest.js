// const GenesisCoffer = artifacts.require("GenesisCoffer");
// const Genesis = artifacts.require("Genesis");
// const Erc20Mocked = artifacts.require("Erc20Mocked");
// const Treasury = artifacts.require("Treasury");
// const GenesisProgram = artifacts.require("GenesisProgram");
// const TransferProxy = artifacts.require("TransferProxy");
// const MocksFactory = artifacts.require("MocksFactory");
// const ExchangeWrapperMocked = artifacts.require("ExchangeWrapperMocked");

// const timeTravel = require('../helpers/timeTravel');


// contract("GenesisProgram ...", async accounts => {

//     let genesis;
//     let baseAsset;
//     let treasury;
//     let transferProxy;
//     let managerAccount = accounts[0];
//     let investorFirst = accounts[1];
//     let mocksFactory
    
//     before('should init program', async () => {
//         genesis = await Genesis.deployed();
//         baseAsset = await Erc20Mocked.deployed();
//         treasury = await Treasury.deployed();
//         transferProxy = await TransferProxy.deployed();
//         mocksFactory = await MocksFactory.deployed();
//     });

//     it("...", async () => {
//       let whiteList = [baseAsset.address];
//       let quantities = [1000];

//       await baseAsset.deposit(managerAccount, 1000);
//       await baseAsset.approve(transferProxy.address, 1000, { from: managerAccount });

//       await transferProxy.batchDeposit(whiteList, quantities, { from: managerAccount });
//       let programAddress = await genesis.createProgram("testProgram", "GVTEST", whiteList, 1000, 1, { from: managerAccount });

//       let secondToken = await mocksFactory.CreateErc20("Second token", "ST");
//       let realSecondToken = secondToken.logs[secondToken.logs.length - 1].args
//       secondToken = await Erc20Mocked.at(realSecondToken.text);

//       let exchange = await mocksFactory.CreateExchange();
//       let realExchange = exchange.logs[exchange.logs.length - 1].args
//       exchange = await ExchangeWrapperMocked.at(realExchange.text);

//       await secondToken.deposit(exchange.address, 1000);
        
//       let exchangeAmount = await secondToken.balanceOf.call(exchange.address);
//       assert.equal(1000, exchangeAmount.valueOf());
//     });
// });
