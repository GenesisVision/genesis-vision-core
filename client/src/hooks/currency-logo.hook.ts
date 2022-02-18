import { Currency, Token } from "@pancakeswap/sdk";

const getTokenLogoURL = (address: string) =>
  `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${address}/logo.png`;

export const useCurrencyLogo = (currency?: Currency) => {
  if (currency instanceof Token) {
    return getTokenLogoURL(currency.address);
  }
  return getTokenLogoURL("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c");
};
