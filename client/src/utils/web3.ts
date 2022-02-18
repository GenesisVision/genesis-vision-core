import { InjectedConnector } from "@web3-react/injected-connector";
import { ChainId } from "@pancakeswap/sdk";

const BINANCE_SMART_CHAIN_ID = ChainId.MAINNET;
const TEST_CHAIN_ID = ChainId.TESTNET;

export const metamaskConnector = new InjectedConnector({
  supportedChainIds: [BINANCE_SMART_CHAIN_ID, TEST_CHAIN_ID]
});
