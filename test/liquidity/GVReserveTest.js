const GVReserve = artifacts.require("GVReserve");
const MocksFactory = artifacts.require("MocksFactory");
const Erc20Mocked = artifacts.require("Erc20Mocked");

contract("GVReserve", async accounts => {

    let gvReserve;
    let mocksFactory;
    
    before('should init reserve', async () => {
        gvReserve = await GVReserve.deployed();
        mocksFactory = await MocksFactory.deployed();
        await gvReserve.setLiquidityPool(accounts[1])
    });

    it("reserve should transfer to account[2]", async () => {
        let token = await mocksFactory.CreateErc20("Token", "T");
        let realToken = token.logs[token.logs.length - 1].args
        token = await Erc20Mocked.at(realToken.text);
        
        await token.deposit(gvReserve.address, 1000);
        await gvReserve.transfer(token.address, 500, accounts[2], {from: accounts[1]});

        let amount = await token.balanceOf.call(accounts[2]);
        assert.equal(500, amount.valueOf());
    });

    it("reserve should not transfer to account[3]", async () => {
        let token = await mocksFactory.CreateErc20("Token2", "T2");
        let realToken = token.logs[token.logs.length - 1].args
        token = await Erc20Mocked.at(realToken.text);
        
        await token.deposit(gvReserve.address, 1000);
        try {
            await gvReserve.transfer(token.address, 500, accounts[2], {from: accounts[3]});
        } catch(error) {}
        let amount = await token.balanceOf.call(accounts[2]);
        assert.equal(0, amount.valueOf());
    });
});