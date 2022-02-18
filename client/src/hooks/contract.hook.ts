import { Contract } from "@ethersproject/contracts";
import { getMulticallAddress } from "utils/address.helpers";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import multiCallAbi from "../config/abi/Multicall.json";
import ERC20_ABI from "../config/abi/erc20.json";
import WETH_ABI from "../config/abi/weth.json";
import { useMemo } from "react";
import { getContract } from "utils";
import { ERC20_BYTES32_ABI } from "../config/abi/erc20";
import useActiveWeb3React from "./web3active.hook";
import { WETH } from "@pancakeswap/sdk";

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

function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | null {
  const { library, account } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        withSignerIfPossible ? getProviderOrSigner(library, account) : null
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}

export function useBytes32TokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible);
}

export function useMulticallContract(): Contract | null {
  return useContract(getMulticallAddress(), multiCallAbi, false);
}

export function useWETHContract(
  withSignerIfPossible?: boolean
): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    chainId ? WETH[chainId].address : undefined,
    WETH_ABI,
    withSignerIfPossible
  );
}
