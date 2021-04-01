const GVLiquidityPool = artifacts.require("GVLiquidityPool");
const MocksFactory = artifacts.require("MocksFactory");
const Erc20Mocked = artifacts.require("Erc20Mocked");

contract("GVLiquidityPool", async accounts => {

    let pool;
    let mocksFactory;
    
    before('should init liquidity pool', async () => {
        pool = await GVLiquidityPool.deployed();
        mocksFactory = await MocksFactory.deployed();
    });

    it("should place order", async () => {
        let token = await mocksFactory.CreateErc20("Token", "T");
        let realToken = token.logs[token.logs.length - 1].args
        token = await Erc20Mocked.at(realToken.text);
        
        await token.deposit(gvReserve.address, 1000);
        await gvReserve.transfer(token.address, 500, accounts[2], {from: accounts[1]});

        let amount = await token.balanceOf.call(accounts[2]);
        assert.equal(500, amount.valueOf());
    });
});