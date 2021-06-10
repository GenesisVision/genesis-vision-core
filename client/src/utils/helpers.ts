import { NumberFormatValues } from "react-number-format";
import { TradingScheduleInfo } from "./gv-api.types";

const hasCorrectCountNulls = (
  value: string,
  countNulls: number = 1
): boolean => {
  const [whole, fraction] = value.split(".");
  if (fraction === undefined) return true;
  return fraction.length <= countNulls;
};

export const allowPositiveValuesNumberFormat =
  (countNulls: number = 1) =>
  ({ value, formattedValue, floatValue }: NumberFormatValues): boolean => {
    return (
      formattedValue === "" ||
      formattedValue === "0." ||
      (formattedValue[0] !== "-" &&
        floatValue! >= 0 &&
        hasCorrectCountNulls(value, countNulls))
    );
  };

export const safeGetElemFromArray = <T>(
  arr: T[],
  predicate: (item: T) => boolean
): T => {
  if (!arr || arr.length === 0) {
    console.log("Array \n", arr, "\nis empty or not found");
  }
  const item = arr.find(predicate);
  if (!item) {
    console.log(
      "safeGetElemFromArray: Array \n",
      arr,
      "\nisn't contain element for predicate: \n",
      predicate
    );
    return arr[0];
  }
  return item;
};

const correctMinuteString = (minute: number): string =>
  minute < 10 ? `0${minute}` : String(minute);

export const generateScheduleText = (
  schedule?: TradingScheduleInfo
): string => {
  if (!schedule) return "";
  const { dayEnd, dayStart, hourEnd, hourStart, minuteEnd, minuteStart } =
    schedule;
  const hourStartInPM = hourStart > 12 ? hourStart - 12 : hourStart;
  const hourEndInPM = hourEnd > 12 ? hourEnd - 12 : hourEnd;
  return `${dayStart} - ${dayEnd}, ${hourStartInPM}:${correctMinuteString(
    minuteStart
  )} p.m. - ${hourEndInPM}:${correctMinuteString(minuteEnd)} p.m. (UTC)`;
};
