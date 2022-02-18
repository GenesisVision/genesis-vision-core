import { Token, TokenAmount } from "@pancakeswap/sdk";
import { useWeb3React } from "@web3-react/core";
import { useTokenBalances } from "hooks/wallet";
import useActiveWeb3React from "hooks/web3active.hook";
import { useMemo } from "react";
import { TokenAddressMap, useCombinedActiveList } from "state/lists/hooks";

// reduce token map into standard address <-> Token mapping, optionally include user added tokens
function useTokensFromMap(
  tokenMap: TokenAddressMap,
  includeUserAdded: boolean
): { [address: string]: Token } {
  const { chainId } = useActiveWeb3React();

  return useMemo(() => {
    if (!chainId) return {};

    // reduce to just tokens
    const mapWithoutUrls = Object.keys(tokenMap[chainId]).reduce<{
      [address: string]: Token;
    }>((newMap, address) => {
      newMap[address] = tokenMap[chainId][address].token;
      return newMap;
    }, {});

    return mapWithoutUrls;
  }, [chainId, tokenMap]);
}

export function useAllTokens(): { [address: string]: Token } {
  const allTokens = useCombinedActiveList();
  return useTokensFromMap(allTokens, true);
}

// mimics useAllBalances
export function useAllTokenBalances(): {
  [tokenAddress: string]: TokenAmount | undefined;
} {
  const { account } = useWeb3React();
  const allTokens = useAllTokens();
  const allTokensArray = useMemo(
    () => Object.values(allTokens ?? {}),
    [allTokens]
  );
  const balances = useTokenBalances(account ?? undefined, allTokensArray);
  return balances ?? {};
}
