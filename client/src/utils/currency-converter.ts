export const CURRENCY_FRACTIONS = (currency: string): number => {
  switch (currency) {
    case "BTC":
    case "ETH":
      return 8;
    case "USD":
    case "EUR":
      return 2;
    default:
      return 4;
  }
};

export const checkCurrencyValue = (value: number, currency: string): number =>
  Math.abs(value) < Math.pow(10, -CURRENCY_FRACTIONS(currency)) ? 0 : value;
