import { Address } from "config/constants/types";
import { ChainId } from "@pancakeswap/sdk";
import addresses from "config/constants/contracts";

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID;
  return address[chainId] ? address[chainId] : address[ChainId.MAINNET];
};

export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall);
};
