const { expect } = require("chai");

describe("GenesisVisionGateway", () => {
    let gateway;

    beforeEach(async () => {
        let GenesisVisionGatewayFactory = await ethers.getContractFactory("GenesisVisionGateway");
        let GenesisVisionGateway = await GenesisVisionGatewayFactory.deploy();
        gateway = await GenesisVisionGateway.deployed();
    
        const [addr1] = await ethers.getSigners();
        await gateway.setOperator(addr1.address);
    });

    it("should add asset", async () => {
        const [addr1] = await ethers.getSigners();
        await expect(gateway.connect(addr1).addAsset(1, 0))
          .to.emit(gateway, 'AssetAdded')
          .withArgs(1, 0);
    });

    it("should remove asset", async () => {
        const [addr1] = await ethers.getSigners();
        await expect(gateway.connect(addr1).removeAsset(1))
          .to.emit(gateway, 'AssetRemoved')
          .withArgs(1);
    });

    it("should add invest request", async () => {
        const [addr1, addr2] = await ethers.getSigners();

        await gateway.connect(addr1).addAsset(2, 0);
        await expect(gateway.connect(addr2).investRequest(2, { value: 1 }))
          .to.emit(gateway, 'NewInvestRequest')
          .withArgs(2, addr2.address, 1, 0);
    });
});
