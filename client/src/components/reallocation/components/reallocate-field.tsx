import { FundAssetRemoveType } from "components/fund-asset/fund-asset.container";
import useAnchor from "hooks/anchor.hook";
import React, { useCallback, useEffect, useState } from "react";
import {
  FundAssetPart,
  PlatformAsset,
  PlatformAssetFull,
  ProviderPlatformAssets
} from "utils/gv-api.types";
import { safeGetElemFromArray } from "utils/helpers";
import {
  composeSelectedAssets,
  getRemainder,
  getRemainderWithoutSelected
} from "../reallocation.helpers";
import AddAsset from "./add-asset/add-asset";
import { TRegulatorInputHandle } from "./add-asset/add-asset-list";
import AssetsComponent from "./assets-block/assets-block";

export interface IReallocateFieldProps {
  scheduleMessage?: string;
  providers: ProviderPlatformAssets[];
  name: string;
  value: FundAssetPart[];
  assets: PlatformAsset[];
  error?: string;
  touched: boolean;
  onChange(event: {
    target: {
      value: FundAssetPart[];
      name: string;
    };
  }): void;
  onBlur(event: {
    target: {
      name: string;
    };
  }): void;
}

const _ReallocateField: React.FC<IReallocateFieldProps> = ({
  scheduleMessage,
  providers,
  name,
  value = [],
  assets,
  error,
  touched,
  onChange,
  onBlur
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const [stateAssets, setStateAssets] = useState<PlatformAssetFull[]>(
    composeSelectedAssets(value, assets).sort((a, b) => b.percent - a.percent)
  );
  const [newAsset, setNewAsset] = useState<PlatformAssetFull | undefined>(
    undefined
  );
  const [remainder, setRemainder] = useState<number>(getRemainder(stateAssets));

  const submitChanges = useCallback(() => {
    onChange({
      target: {
        value: stateAssets.filter(asset => asset.percent > 0),
        name
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateAssets, name]);

  useEffect(() => {
    if (!newAsset) return;
    const assets = stateAssets.map(item =>
      item.asset === newAsset.asset ? newAsset : item
    );
    setStateAssets(assets);
    setRemainder(getRemainder(assets));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAsset]);

  useEffect(() => {
    if (!anchor && !!newAsset) {
      onBlur &&
        onBlur({
          target: {
            name
          }
        });
      submitChanges();
    }
  }, [anchor, name, newAsset, onBlur, submitChanges]);

  useEffect(() => {
    if (!anchor)
      setStateAssets(stateAssets.sort((a, b) => b.percent - a.percent));
  }, [anchor, stateAssets]);

  const handlePercentChange: TRegulatorInputHandle = useCallback(
    (asset): React.ChangeEventHandler<HTMLInputElement> =>
      ({ target }) => {
        const value = +target.value;
        if (isNaN(value)) return;
        const remainderWithoutSelected = getRemainderWithoutSelected(
          asset,
          stateAssets
        );
        setNewAsset({
          ...asset,
          percent: Math.min(remainderWithoutSelected, Math.abs(value))
        });
      },
    [stateAssets]
  );

  const handleDown = useCallback(
    (asset: PlatformAssetFull) => () => {
      if (asset.percent === asset.mandatoryFundPercent) return;
      setNewAsset({ ...asset, percent: asset.percent - 1 });
    },
    []
  );

  const handleUp = useCallback(
    (asset: PlatformAssetFull) => () => {
      if (remainder - 1 < 0) return;
      setNewAsset({ ...asset, percent: asset.percent + 1 });
    },
    [remainder]
  );

  const handleRemove: FundAssetRemoveType = useCallback(
    currency => () => {
      const asset = safeGetElemFromArray(
        stateAssets,
        item => item.asset === currency
      );
      setNewAsset({ ...asset, percent: asset.mandatoryFundPercent });
      submitChanges();
    },
    [stateAssets, submitChanges]
  );

  return (
    <>
      <AssetsComponent
        providers={providers}
        scheduleMessage={scheduleMessage}
        touched={touched}
        error={error}
        assets={stateAssets.filter(item => item.percent > 0)}
        remainder={remainder}
        removeHandle={handleRemove}
        addHandle={setAnchor}
      />
      <AddAsset
        providers={providers}
        remainder={remainder}
        anchor={anchor}
        handleCloseDropdown={clearAnchor}
        assets={stateAssets}
        handleDown={handleDown}
        handleUp={handleUp}
        handlePercentChange={handlePercentChange}
      />
    </>
  );
};

const ReallocateField = React.memo(_ReallocateField);
export default ReallocateField;
