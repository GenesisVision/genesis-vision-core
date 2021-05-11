// const { expect } = require("chai");

// // const GVLiquidityPool = artifacts.require("GVLiquidityPool");
// // const MocksFactory = artifacts.require("MocksFactory");
// // const Erc20Mocked = artifacts.require("Erc20Mocked");
// // const GVReserve = artifacts.require("GVReserve");
// // const truffleAssert = require('truffle-assertions');

// //TODO How to import lib
// //const Order = artifacts.require("Orders.Order");
// const Erc20MockedContract = require('../../build/contracts/Erc20Mocked');
// //const Orders = require('../../build/contracts/Orders');

// describe("GVLiquidityPool", async () => {
//     let gvReserve;
//     let pool;
//     let mocksFactory;
//     let token1;
//     let token2;

//     let orderHash;
//     before('should init liquidity pool', async () => {

//         let GVLiquidityPoolFactory = await ethers.getContractFactory("GVLiquidityPool");
//         let GVLiquidityPool = await GVLiquidityPoolFactory.deploy();
//         pool = await GVLiquidityPool.deployed();
        
//         let GVReserveFactory = await ethers.getContractFactory("GVReserve");
//         let GVReserve = await GVReserveFactory.deploy();
//         gvReserve = await GVReserve.deployed();

//         let MocksFactoryFactory = await ethers.getContractFactory("MocksFactory");
//         let MocksFactory = await MocksFactoryFactory.deploy();
//         mocksFactory = await MocksFactory.deployed();

//         await gvReserve.setLiquidityPool(pool.address);
//         await pool.setGVReserve(gvReserve.address);
        
//         token1 = await mocksFactory.CreateErc20("Token", "T");
//         let res = await token1.wait();

//         let realTokenAddress = res.logs[res.logs.length - 1].data.replace("0x000000000000000000000000", "0x");
//         token1 = new ethers.Contract(realTokenAddress, Erc20MockedContract.abi, ethers.getDefaultProvider());

//         token2 = await mocksFactory.CreateErc20("Token", "T");
//         res = await token2.wait();

//         realTokenAddress = res.logs[res.logs.length - 1].data.replace("0x000000000000000000000000", "0x");
//         token2 = new ethers.Contract(realTokenAddress, Erc20MockedContract.abi, ethers.getDefaultProvider());

//         const [owner, addr1] = await ethers.getSigners();

//         await token1.connect(owner).deposit(addr1.address, 1000);
//         await token2.connect(owner).deposit(gvReserve.address, 1000);
//     });

//     it("should emit event on place order", async () => {
//         let OrdersFactory = await ethers.getContractFactory("Orders");
//         let Orders = await OrdersFactory.deploy();
//         orders = await Orders.deployed();

//         const [owner, addr1, addr2] = await ethers.getSigners();

//         let order = await orders.createOrder(
//             owner.address, // maker
//             token1.address, // fromToken
//             token2.address, // toToken
//             100, // amountSrc
//             200, // minAmountDest
//             999999999999 // expiration date
//         );

//         orderHash = "0x14e66a5cf69fb6d96bf971b405a2b832a7c2709756ac3cc5cf0fcf598338d117";

//         await expect(pool.placeOrder(order))
//           .to.emit(pool, 'NewOrder')
//           .withArgs(orderHash);
//     });

//     it("should execute order", async() => {
//         const [owner, addr1, addr2] = await ethers.getSigners();

//         await pool.setOperator(owner.address);
//         await pool.executeOrder(orderHash, 200);

//         let gvReserveAmount1 = await token1.balanceOf.call(gvReserve.address);
//         let gvReserveAmount2 = await token2.balanceOf.call(gvReserve.address);
//         expect(gvReserveAmount1).to.equal(100);
//         expect(gvReserveAmount2).to.equal(800);
    
//         let accountAmount1 = await token1.balanceOf.call(accounts[1]);
//         let accountAmount2 = await token2.balanceOf.call(accounts[1]);
//         expect(accountAmount1).to.equal(900);
//         expect(accountAmount2).to.equal(200);
//     });

//     it("should cancel order", async () => {
//         let order = new Orders.Order();
//         order.maker = accounts[1];
//         order.fromToken = token1.address;
//         order.toToken = token2.address;
//         order.amountSrc = 100;
//         order.minAmountDest = 200;

//         //TODO How to set Date
//         //TODO test on expiration date
//         order.expirationDate = 999999999999;
//         await pool.placeOrder(order);
//         orderHash = ""; // TODO calculate hash
//         await pool.cancelOrder(orderHash);
//         truffleAssert.eventEmitted(tx, 'OrderCancelled', (ev) => {
//             return ev.orderHash === orderHash;
//           });
//     });
//     // TODO test cancel order
// });