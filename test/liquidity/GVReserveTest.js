const { expect } = require("chai");

// const GVReserve = artifacts.require("GVReserve");
// const MocksFactory = artifacts.require("MocksFactory");
// const Erc20Mocked = artifacts.require("Erc20Mocked");

const Erc20MockedContract = require('../../artifacts/contracts/mocks/Erc20Mocked.sol/Erc20Mocked');

describe("GVReserve", () => {

    let gvReserve;
    let mocksFactory;
    
    before('should init reserve', async () => {
        let GVReserveFactory = await ethers.getContractFactory("GVReserve");
        let GVReserve = await GVReserveFactory.deploy();
        gvReserve = await GVReserve.deployed();

        let MocksFactoryFactory = await ethers.getContractFactory("MocksFactory");
        let MocksFactory = await MocksFactoryFactory.deploy();
        mocksFactory = await MocksFactory.deployed();

        const [owner, addr1] = await ethers.getSigners();

        await gvReserve.setLiquidityPool(addr1.address);
    });

    it("reserve should transfer to account[2]", async () => {
        let token = await mocksFactory.CreateErc20("Token", "T");
        let res = await token.wait();

        let realTokenAddress = res.logs[res.logs.length - 1].data.replace("0x000000000000000000000000", "0x");
        token = new ethers.Contract(realTokenAddress, Erc20MockedContract.abi, ethers.getDefaultProvider());
        
        const [owner, addr1, addr2] = await ethers.getSigners();
        await token.connect(owner).deposit(gvReserve.address, 1000);
        await gvReserve.connect(addr1).transfer(token.address, 500, addr2.address);

        let amount = await token.connect(owner).balanceOf(addr2.address);
        assert.equal(500, amount.valueOf());
    });

    it("reserve should not transfer to account[3]", async () => {
        let token = await mocksFactory.CreateErc20("Token2", "T");
        let res = await token.wait();

        let realTokenAddress = res.logs[res.logs.length - 1].data.replace("0x000000000000000000000000", "0x");
        token = new ethers.Contract(realTokenAddress, Erc20MockedContract.abi, ethers.getDefaultProvider());
        
        const [owner, addr1, addr2, addr3] = await ethers.getSigners();
        
        await token.connect(owner).deposit(gvReserve.address, 1000);
        try {
            await gvReserve.connect(addr3.address).transfer(token.address, 500, addr2.address);
        } catch(error) {}
        let amount = await token.connect(owner).balanceOf(addr2.address);
        assert.equal(0, amount.valueOf());
    });
});