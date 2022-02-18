import { parseUnits } from "@ethersproject/units";
import {
  Currency,
  CurrencyAmount,
  JSBI,
  Percent,
  Token,
  TokenAmount
} from "@pancakeswap/sdk";
import {
  ALLOWED_PRICE_IMPACT_HIGH,
  PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN
} from "config/constants";

// try to parse a user entered amount for a given token
export function tryParseAmount(
  value?: string,
  currency?: Currency
): CurrencyAmount | undefined {
  if (!value || !currency) {
    return undefined;
  }
  try {
    const typedValueParsed = parseUnits(value, currency.decimals).toString();
    if (typedValueParsed !== "0") {
      return currency instanceof Token
        ? new TokenAmount(currency, JSBI.BigInt(typedValueParsed))
        : CurrencyAmount.ether(JSBI.BigInt(typedValueParsed));
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.log(`Failed to parse input amount: "${value}"`, error);
  }
  // necessary for all paths to return a value
  return undefined;
}

/**
 * Given the price impact, get user confirmation.
 *
 * @param priceImpactWithoutFee price impact of the trade without the fee.
 * @param t Translation
 */
export default function confirmPriceImpactWithoutFee(
  priceImpactWithoutFee: Percent
): boolean {
  if (!priceImpactWithoutFee.lessThan(PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN)) {
    const confirmWord = "confirm";
    return (
      // eslint-disable-next-line no-alert
      window.prompt(
        `This swap has a price impact of at least ${PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN.toFixed(
          0
        )}. Please type the word "${confirmWord}" to continue with this swap.`
      ) === confirmWord
    );
  }
  if (!priceImpactWithoutFee.lessThan(ALLOWED_PRICE_IMPACT_HIGH)) {
    // eslint-disable-next-line no-alert
    return window.confirm(
      `This swap has a price impact of at least ${ALLOWED_PRICE_IMPACT_HIGH.toFixed(
        0
      )}. Please confirm that you would like to continue with this swap.`
    );
  }
  return true;
}
