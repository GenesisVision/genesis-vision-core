const AdminOperatorAccessMock = artifacts.require("AdminOperatorAccessMock");


contract("AdminOperatorAccessMock", async accounts => {

    it("should have admin", async () => {
        let mock = await AdminOperatorAccessMock.deployed();
        let admin = await mock.getAdmin();
        assert.equal(accounts[0], admin);
    });

    it("should change admin", async () => {
        let mock = await AdminOperatorAccessMock.deployed();
        await mock.setAdmin(accounts[1]);
        let newAdmin = await mock.getAdmin();
        assert.equal(accounts[1], newAdmin);
    });

    it("should only admin has access to changing operator", async () => {
        let mock = await AdminOperatorAccessMock.deployed();
        try {
            await mock.setOperator(accounts[2]);
        } catch(error) {
            return;
        }
        assert.fail("Access error");
    });

    it("should change operator", async () => {
        let mock = await AdminOperatorAccessMock.deployed();
        await mock.setAdmin(accounts[0], { from: accounts[1] });
        await mock.setOperator(accounts[1]);
        let newOperator = await mock.getOperator();
        assert.equal(accounts[1], newOperator);
    });

    it("should only admin call admin function", async () => {
        let mock = await AdminOperatorAccessMock.deployed();
        try {
            await mock.testAdminAccess({from : accounts[2]});
        } catch(error) {
            await mock.testAdminAccess({from : accounts[0]});
            return;
        }
        assert.fail("Access error");
    });

    it("should only operator call operator function", async () => {
        let mock = await AdminOperatorAccessMock.deployed();
        try {
            await mock.testOperatorAccess({from : accounts[3]});
        } catch(error) {
            await mock.testOperatorAccess({from : accounts[1]});
            return;
        }
        assert.fail("Access error");
    });
});
