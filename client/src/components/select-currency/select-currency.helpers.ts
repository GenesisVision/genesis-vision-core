import { Token, TokenAmount } from "@pancakeswap/sdk";
import { useAllTokenBalances } from "hooks/token";
import { useMemo } from "react";
import { isAddress } from "utils";

export function useSortedTokensByQuery(
  tokens: Token[] | undefined,
  searchQuery: string
): Token[] {
  return useMemo(() => {
    if (!tokens) {
      return [];
    }

    const symbolMatch = searchQuery
      .toLowerCase()
      .split(/\s+/)
      .filter(s => s.length > 0);

    if (symbolMatch.length > 1) {
      return tokens;
    }

    const exactMatches: Token[] = [];
    const symbolSubstrings: Token[] = [];
    const rest: Token[] = [];

    // sort tokens by exact match -> substring on symbol match -> rest
    tokens.map(token => {
      if (token.symbol?.toLowerCase() === symbolMatch[0]) {
        return exactMatches.push(token);
      }
      if (
        token.symbol?.toLowerCase().startsWith(searchQuery.toLowerCase().trim())
      ) {
        return symbolSubstrings.push(token);
      }
      return rest.push(token);
    });

    return [...exactMatches, ...symbolSubstrings, ...rest];
  }, [tokens, searchQuery]);
}

export function filterTokens(tokens: Token[], search: string): Token[] {
  if (search.length === 0) return tokens;

  const searchingAddress = isAddress(search);

  if (searchingAddress) {
    return tokens.filter(token => token.address === searchingAddress);
  }

  const lowerSearchParts = search
    .toLowerCase()
    .split(/\s+/)
    .filter(s => s.length > 0);

  if (lowerSearchParts.length === 0) {
    return tokens;
  }

  const matchesSearch = (s: string): boolean => {
    const sParts = s
      .toLowerCase()
      .split(/\s+/)
      .filter(s_ => s_.length > 0);

    return lowerSearchParts.every(
      p =>
        p.length === 0 || sParts.some(sp => sp.startsWith(p) || sp.endsWith(p))
    );
  };

  return tokens.filter(token => {
    const { symbol, name } = token;
    return (symbol && matchesSearch(symbol)) || (name && matchesSearch(name));
  });
}

// compare two token amounts with highest one coming first
function balanceComparator(balanceA?: TokenAmount, balanceB?: TokenAmount) {
  if (balanceA && balanceB) {
    return balanceA.greaterThan(balanceB)
      ? -1
      : balanceA.equalTo(balanceB)
      ? 0
      : 1;
  }
  if (balanceA && balanceA.greaterThan("0")) {
    return -1;
  }
  if (balanceB && balanceB.greaterThan("0")) {
    return 1;
  }
  return 0;
}

function getTokenComparator(balances: {
  [tokenAddress: string]: TokenAmount | undefined;
}): (tokenA: Token, tokenB: Token) => number {
  return function sortTokens(tokenA: Token, tokenB: Token): number {
    // -1 = a is first
    // 1 = b is first

    // sort by balances
    const balanceA = balances[tokenA.address];
    const balanceB = balances[tokenB.address];

    const balanceComp = balanceComparator(balanceA, balanceB);
    if (balanceComp !== 0) return balanceComp;

    if (tokenA.symbol && tokenB.symbol) {
      // sort by symbol
      return tokenA.symbol.toLowerCase() < tokenB.symbol.toLowerCase() ? -1 : 1;
    }
    return tokenA.symbol ? -1 : tokenB.symbol ? -1 : 0;
  };
}

export function useTokenComparator(): (tokenA: Token, tokenB: Token) => number {
  const balances = useAllTokenBalances();
  return useMemo(() => getTokenComparator(balances ?? {}), [balances]);
}
