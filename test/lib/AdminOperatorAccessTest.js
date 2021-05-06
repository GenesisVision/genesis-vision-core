const { expect } = require("chai");

describe("AdminOperatorAccessMock", () => {

    it("should have admin", async () => {
        let AdminOperatorAccessMockFactory = await ethers.getContractFactory("AdminOperatorAccessMock");
        let AdminOperatorAccessMock = await AdminOperatorAccessMockFactory.deploy();
        let mock = await AdminOperatorAccessMock.deployed();
        let admin = await mock.getAdmin();
        const [owner] = await ethers.getSigners();
        expect(admin).to.equal(owner.address);
    });

    it("should change admin", async () => {
        let AdminOperatorAccessMockFactory = await ethers.getContractFactory("AdminOperatorAccessMock");
        let AdminOperatorAccessMock = await AdminOperatorAccessMockFactory.deploy();
        let mock = await AdminOperatorAccessMock.deployed();
        const [addr1] = await ethers.getSigners();
        await mock.setAdmin(addr1.address);
        let newAdmin = await mock.getAdmin();
        expect(newAdmin).to.equal(addr1.address);
    });

    it("should only admin has access to changing operator", async () => {
        let AdminOperatorAccessMockFactory = await ethers.getContractFactory("AdminOperatorAccessMock");
        let AdminOperatorAccessMock = await AdminOperatorAccessMockFactory.deploy();
        let mock = await AdminOperatorAccessMock.deployed();
        const [owner, addr1, addr2] = await ethers.getSigners();
        let realAdmin = await mock.getAdmin();
        await mock.setAdmin(addr1.address);
        realAdmin = await mock.getAdmin();

        try {
            await mock.setOperator(addr2.address);
        } catch(error) {
            return;
        }
        assert.fail("Access error");
    });

    it("should change operator", async () => {
        let AdminOperatorAccessMockFactory = await ethers.getContractFactory("AdminOperatorAccessMock");
        let AdminOperatorAccessMock = await AdminOperatorAccessMockFactory.deploy();
        let mock = await AdminOperatorAccessMock.deployed();
        const [owner, addr1, addr2] = await ethers.getSigners();

        await mock.setAdmin(owner.address);
        await mock.setOperator(addr1.address);
        let newOperator = await mock.getOperator();
        expect(newOperator).to.equal(addr1.address);
    });

    it("should only admin call admin function", async () => {
        let AdminOperatorAccessMockFactory = await ethers.getContractFactory("AdminOperatorAccessMock");
        let AdminOperatorAccessMock = await AdminOperatorAccessMockFactory.deploy();
        let mock = await AdminOperatorAccessMock.deployed();

        const [owner, addr1, addr2] = await ethers.getSigners();
        try {
            await mock.connect(addr2).testAdminAccess();
        } catch(error) {
            await mock.connect(owner).testAdminAccess();
            return;
        }
        assert.fail("Access error");
    });

    it("should only operator call operator function", async () => {
        let AdminOperatorAccessMockFactory = await ethers.getContractFactory("AdminOperatorAccessMock");
        let AdminOperatorAccessMock = await AdminOperatorAccessMockFactory.deploy();
        let mock = await AdminOperatorAccessMock.deployed();

        const [owner, addr1, addr2, addr3] = await ethers.getSigners();
        await mock.setOperator(addr1.address);

        try {
            await mock.connect(addr3).testOperatorAccess();
        } catch(error) {
            await mock.connect(addr1).testOperatorAccess();
            return;
        }
        assert.fail("Access error");
    });
});
