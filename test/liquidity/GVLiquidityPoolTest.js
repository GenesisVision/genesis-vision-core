const GVLiquidityPool = artifacts.require("GVLiquidityPool");
const MocksFactory = artifacts.require("MocksFactory");
const Erc20Mocked = artifacts.require("Erc20Mocked");
const GVReserve = artifacts.require("GVReserve");
const truffleAssert = require('truffle-assertions');

//TODO How to import lib
const Order = artifacts.require("Orders.Order");

contract("GVLiquidityPool", async accounts => {
    let gvReserve;
    let pool;
    let mocksFactory;
    let token1;
    let token2;

    let orderHash;
    before('should init liquidity pool', async () => {
        pool = await GVLiquidityPool.deployed();
        mocksFactory = await MocksFactory.deployed();
        await gvReserve.setLiquidityPool(pool.address);
    
        token1 = await mocksFactory.CreateErc20("Token1", "T1");
        let realToken1 = token1.logs[token1.logs.length - 1].args
        token1 = await Erc20Mocked.at(realToken1.text);
        
        token2 = await mocksFactory.CreateErc20("Token2", "T2");
        let realToken2 = token2.logs[token2.logs.length - 1].args
        token2 = await Erc20Mocked.at(realToken2.text);
        
        await token1.deposit(account[1], 1000);
        await token2.deposit(gvReserve.address, 1000);
    });

    it("should emit event on place order", async () => {
        
        // await token.deposit(gvReserve.address, 1000);
        // await gvReserve.transfer(token.address, 500, accounts[2], {from: accounts[1]});

        // let amount = await token.balanceOf.call(accounts[2]);
        // assert.equal(500, amount.valueOf());
        let order = new Orders.Order();
        order.maker = accounts[1];
        order.fromToken = token1.address;
        order.toToken = token2.address;
        order.amountSrc = 100;
        order.minAmountDest = 200;

        //TODO How to set Date
        //TODO test on expiration date
        order.expirationDate = 999999999999;
        await pool.placeOrder(order);

        orderHash = ""; // TODO calculate hash
        truffleAssert.eventEmitted(tx, 'NewOrder', (ev) => {
            return ev.orderHash === orderHash;
          });
    });

    it("should execute order", async() => {
        pool.executeOrder(orderHash, 200);

        let gvReserveAmount1 = await token1.balanceOf.call(gvReserve.address);
        let gvReserveAmount2 = await token2.balanceOf.call(gvReserve.address);
        assert.equal(100, gvReserveAmount1.valueOf());
        assert.equal(800, gvReserveAmount2.valueOf());
    
        let accountAmount1 = await token1.balanceOf.call(accounts[1]);
        let accountAmount2 = await token2.balanceOf.call(accounts[1]);
        assert.equal(900, accountAmount1.valueOf());
        assert.equal(200, accountAmount2.valueOf());
    });

    // TODO test cancel order
});