import { ethers } from "ethers";
import { AddressZero } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";
import { Web3Provider, JsonRpcSigner } from "@ethersproject/providers";
import { abi as IUniswapV2Router02ABI } from "@uniswap/v2-periphery/build/IUniswapV2Router02.json";
import { getAddress } from "@ethersproject/address";
import { BigNumber } from "@ethersproject/bignumber";
import { simpleRpcProvider } from "./providers";
import { ChainId, JSBI, Percent } from "@pancakeswap/sdk";
import { ROUTER_ADDRESS } from "config/constants";
import { BASE_BSC_SCAN_URLS } from "config";

export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
    .div(BigNumber.from(10000));
}

// account is not optional
export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getRouterContract(
  _: number,
  library: Web3Provider,
  account?: string
): Contract {
  return getContract(
    ROUTER_ADDRESS,
    IUniswapV2Router02ABI,
    getProviderOrSigner(library, account)
  );
}

// account is optional
export function getContract(
  address: string,
  ABI: any,
  signer?: ethers.Signer | ethers.providers.Provider
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, signer ?? simpleRpcProvider);
}

// converts a basis points value to a sdk percent
export function basisPointsToPercent(num: number): Percent {
  return new Percent(JSBI.BigInt(num), JSBI.BigInt(10000));
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function getBscScanLink(
  data: string | number,
  type: "transaction" | "token" | "address" | "block" | "countdown",
  chainId: ChainId = ChainId.MAINNET
): string {
  switch (type) {
    case "transaction": {
      return `${BASE_BSC_SCAN_URLS[chainId]}/tx/${data}`;
    }
    case "token": {
      return `${BASE_BSC_SCAN_URLS[chainId]}/token/${data}`;
    }
    case "block": {
      return `${BASE_BSC_SCAN_URLS[chainId]}/block/${data}`;
    }
    case "countdown": {
      return `${BASE_BSC_SCAN_URLS[chainId]}/block/countdown/${data}`;
    }
    default: {
      return `${BASE_BSC_SCAN_URLS[chainId]}/address/${data}`;
    }
  }
}
