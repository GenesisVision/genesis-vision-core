export interface FundAssetPart {
  id: string;
  percent: number;
}

export interface ProviderPlatformAssets {
  type: AssetProvider;
  tradingSchedule: TradingScheduleInfo;
}

export type AssetProvider = "Undefined" | "Binance" | "Huobi" | "Nasdaq";

export interface TradingScheduleInfo {
  hasTradingSchedule: boolean;
  dayStart: DayOfWeekType;
  hourStart: number;
  minuteStart: number;
  dayEnd: DayOfWeekType;
  hourEnd: number;
  minuteEnd: number;
}

export type DayOfWeekType =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export interface PlatformAssets {
  assets: Array<PlatformAsset>;
  providers: Array<ProviderPlatformAssets>;
}

export interface PlatformAsset {
  id: string;
  name: string;
  asset: string;
  description: string;
  logoUrl: string;
  color: string;
  url: string;
  provider: AssetProvider;
  mandatoryFundPercent: number;
}

export type PlatformAssetFull = PlatformAsset & FundAssetPart;

export interface FundAssetPartWithIcon {
  name: string;
  asset: string;
  percent: number;
  logoUrl: string;
  color: string;
  url: string;
}

export type FundAssetViewType = "large" | "middle" | "short" | "text";

export interface FundAssetInfo {
  asset: string;
  symbol: string;
  logoUrl: string;
  target: number;
  current: number;
  currentAmount: number;
  url: string;
}

export interface FundAssetPercent {
  asset: string;
  name: string;
  percent: number;
  logoUrl: string;
  url: string;
}

export type Currency =
  | "Undefined"
  | "GVT"
  | "ETH"
  | "BTC"
  | "USDT"
  | "BNB"
  | "USDC"
  | "DAI"
  | "USD";

export type CurrencyEnum = Currency;

export interface TradingScheduleInfo {
  hasTradingSchedule: boolean;
  dayStart: DayOfWeekType;
  hourStart: number;
  minuteStart: number;
  dayEnd: DayOfWeekType;
  hourEnd: number;
  minuteEnd: number;
}

export type ImageQuality = "Low" | "Medium" | "High" | "Original";

export interface FundCreateAssetPlatformInfo {
  maxEntryFee: number;
  maxExitFee: number;
  minDeposit: number;
}
