import {
  FundAssetPart,
  FundAssetPartWithIcon,
  PlatformAsset,
  PlatformAssetFull,
} from "utils/gv-api.types";

const MAX_PERCENT = 100;

export const composeSelectedAssets = (
  assetsPercents: FundAssetPart[],
  assets: PlatformAsset[]
): PlatformAssetFull[] =>
  assets.map((asset) => {
    const targetAsset = assetsPercents.find((x) => x.id === asset.id);
    const percent = targetAsset
      ? targetAsset.percent
      : asset.mandatoryFundPercent;
    return { ...asset, percent };
  });

export const getRemainder = (assets: { percent: number }[]) =>
  MAX_PERCENT - assets.reduce((sum, item) => sum + item.percent, 0);

export const getRemainderWithoutSelected = (
  asset: FundAssetPartWithIcon,
  assets: PlatformAssetFull[]
) =>
  MAX_PERCENT -
  assets
    .filter((item) => item.asset !== asset.asset)
    .reduce((sum, item) => sum + item.percent, 0);
