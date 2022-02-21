import { ChainId, Currency, ETHER, Token, WETH } from "@pancakeswap/sdk";

export function wrappedCurrency(
  currency: Currency | undefined,
  chainId: ChainId | undefined
): Token | undefined {
  return chainId && currency === ETHER
    ? WETH[chainId]
    : currency instanceof Token
    ? currency
    : undefined;
}

export function unwrappedToken(token: Token): Currency {
  if (token.equals(WETH[token.chainId])) return ETHER;
  return token;
}
