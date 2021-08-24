import { checkCurrencyValue, CURRENCY_FRACTIONS } from "./currency-converter";
import { CurrencyEnum } from "./gv-api.types";

export const separateThousand = (
  number: number | string,
  separator: string = " "
): string => number.toLocaleString("en").replace(/,/g, separator);

const reverseString = (value: string | number): string =>
  String(value).split("").reverse().join("");

const addOneWrapper =
  (up?: boolean) =>
  (item: string[]): string[] => {
    const result = addOne(item);
    return up ? addOneUp(result) : result;
  };

const addOne = (item: string[]): string[] => {
  const [whole, fraction] = item;
  return fraction
    ? [whole, +fraction === 0 ? fraction.slice(0, -1) + "1" : fraction]
    : item;
};

export const addOneUp = (item: string[]): string[] => {
  const [whole, fraction] = item;
  if (!fraction) return item;
  const uppedFraction = String(+fraction + 1);
  return fraction && fraction.length - uppedFraction.length >= 0
    ? [
        whole,
        "0".repeat(fraction.length - uppedFraction.length) + uppedFraction
      ]
    : item;
};

const cleanNulls = (item: string[]): string[] =>
  item[1] ? [item[0], reverseString(+reverseString(item[1]))] : item;

const sliceFraction =
  (decimalScale?: number) =>
  (item: string[]): string[] => {
    if (decimalScale === 0) return [item[0]];
    if (decimalScale && decimalScale > 0)
      return [item[0], item[1].slice(0, decimalScale)];
    if (+item[0] < 10) return [item[0], item[1].slice(0, 8)];
    if (+item[0] < 100) return [item[0], item[1].slice(0, 6)];
    if (+item[0] < 1000) return [item[0], item[1].slice(0, 4)];
    if (+item[0] >= 1000) return [item[0], item[1].slice(0, 2)];
    return item;
  };

const checkEmptyFraction = (item: string[]): string =>
  item[1] ? item.join(".") : item[0];

const formatValue = (
  value: any,
  decimalScale?: number,
  abs?: boolean,
  options?: { breakZero?: boolean; up?: boolean }
): string => {
  value = typeof value !== "number" ? +value : value;
  value = abs ? Math.abs(value) : value;
  if (
    value === undefined ||
    isNaN(value) ||
    (!options?.breakZero && value.toFixed(0) == value)
  )
    return String(value);

  return [value.toFixed(10).split(".")]
    .map(sliceFraction(decimalScale))
    .map(addOneWrapper(options?.up))
    .map(cleanNulls)
    .map(checkEmptyFraction)
    .join();
};

const formatPercent = (value: number): string => {
  if (value < 0.1 && value > -0.1) return "0";
  return formatValue(value, value > 1 || value < -1 ? 0 : 1);
};

const roundPercents = (value: number): string => {
  const abs = Math.abs(value);
  const newValue = value === 0 ? 0 : formatValue(Math.max(abs, 0.01), 2);
  return `${value < 0.01 && value > 0 ? "<" : ""}${newValue}%`; // TODO put a percent sign
};

const validateFraction = (value: string, currency: string): boolean => {
  const fraction = value.split(".")[1];
  return fraction ? fraction.length <= CURRENCY_FRACTIONS(currency) : true;
};

const formatCurrencyValue = (
  value: number,
  currency: string | CurrencyEnum,
  options?: { up: boolean }
): string =>
  formatValue(
    checkCurrencyValue(value, currency),
    CURRENCY_FRACTIONS(currency),
    false,
    { up: options?.up }
  );

const formatValueDifferentDecimalScale = (
  value: number,
  decimalScaleSmallValue: number,
  decimalScaleBigValue: number
): string => {
  if (value < 1 && value > -1)
    return formatValue(value, decimalScaleSmallValue);
  return formatValue(value, decimalScaleBigValue);
};

export {
  reverseString,
  addOne,
  cleanNulls,
  sliceFraction,
  checkEmptyFraction,
  formatValue,
  formatPercent,
  validateFraction,
  formatCurrencyValue,
  roundPercents,
  formatValueDifferentDecimalScale
};
