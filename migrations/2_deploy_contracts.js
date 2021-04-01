var AdminOperatorAccessMock = artifacts.require("AdminOperatorAccessMock.sol");
var GenesisVisionGateway = artifacts.require("GenesisVisionGateway.sol");

const Treasury = artifacts.require("Treasury");
const Genesis = artifacts.require("Genesis");
const TransferProxy = artifacts.require("TransferProxy");
const GenesisCofferSettings = artifacts.require("GenesisCofferSettings");
const GenesisCoffer = artifacts.require("GenesisCoffer");
const Erc20Mocked = artifacts.require("Erc20Mocked");
const MocksFactory = artifacts.require("MocksFactory");
const GVReserve = artifacts.require("GVReserve");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(GenesisVisionGateway);

  if(network == "development") {
    deployer.deploy(AdminOperatorAccessMock);
    let gateway = await GenesisVisionGateway.deployed();
    await gateway.setOperator(accounts[1]);
  };

  const initialCofferDeposit = 1000;
  const cofferName = "";
  const cofferTicker = "";
  const cofferManagementFee = 10 * 100; // 10%
  const minManagerInitialDeposit = 1000;

  var wethInstance;
  var treasuryInstance;
  var cofferSettingsInstance;
  await deployer.deploy(Erc20Mocked, "Weth test", "WETH")
  .then(function(weth){
    wethInstance = weth.address;
    return deployer.deploy(Treasury);
  }).then(function(treasury){
    treasuryInstance = treasury.address;
    return deployer.deploy(Genesis, treasuryInstance);
  }).then(function(genesis){
    return genesis.setRequiredAssetAddress(wethInstance);
  }).then(function(){
    return deployer.deploy(GenesisCofferSettings, minManagerInitialDeposit);
  }).then(function(cofferSettings){
    cofferSettingsInstance = cofferSettings.address;
    return deployer.deploy(TransferProxy, treasuryInstance)
  }).then(function(){
    return deployer.deploy(GenesisCoffer, initialCofferDeposit, cofferName, cofferTicker, cofferManagementFee, cofferSettingsInstance);
  }).then(function(){
    return deployer.deploy(MocksFactory);
  }).then(function(){
    return deployer.deploy(GVReserve);
  });

};