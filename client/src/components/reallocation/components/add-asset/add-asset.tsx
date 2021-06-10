import useTab from "hooks/tab.hook";
import React, { useCallback, useEffect, useState } from "react";
import GVTabs from "shared/gv-tabs";
import GVTab from "shared/gv-tabs/gv-tab";
import GVTextField from "shared/gv-text-field";
import { SearchIcon } from "shared/icon/search-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS,
} from "shared/popover/popover";
import { PopoverContent } from "shared/popover/popover-content";
import { TRegulatorHandle } from "shared/regulator/regulator";
import { RowItem } from "shared/row-item/row-item";
import styled from "styled-components";
import {
  adaptiveFullPadding,
  adaptivePadding,
  horizontalPaddings,
} from "styles/mixins";
import {
  $paddingXsmall,
  $paddingXxsmall,
  $popoverPaddingMedium,
} from "styles/sizes";
import { PlatformAssetFull, ProviderPlatformAssets } from "utils/gv-api.types";
import AddAssetList, { TRegulatorInputHandle } from "./add-asset-list";

const TitleBlock = styled.div`
  ${adaptiveFullPadding($popoverPaddingMedium)}
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StyledAssets = styled.div`
  ${adaptivePadding("bottom", $popoverPaddingMedium)}
  max-height: 180px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  table {
    ${horizontalPaddings($popoverPaddingMedium)}
    border-spacing: 0;
  }
  td {
    padding-top: ${$paddingXxsmall}px;
    &:not(:last-child) {
      padding-right: ${$paddingXsmall}px;
    }
  }
`;

interface Props {
  providers: ProviderPlatformAssets[];
  remainder: number;
  anchor?: EventTarget;
  assets: PlatformAssetFull[];
  handleCloseDropdown(): void;
  handleDown: TRegulatorHandle;
  handleUp: TRegulatorHandle;
  handlePercentChange: TRegulatorInputHandle;
}

const _AddAsset: React.FC<Props> = ({
  providers,
  remainder,
  assets,
  anchor,
  handleCloseDropdown,
  handleDown,
  handleUp,
  handlePercentChange,
}) => {
  const tradingAssetObject = providers.reduce((prev, curr) => {
    return { ...prev, [curr.type]: curr };
  }, {}) as { [keys: string]: ProviderPlatformAssets };
  const tabs = Object.keys(tradingAssetObject);

  const { tab, setTab } = useTab<any>(tabs[0]);
  const [filteredAssets, setFilteredAssets] =
    useState<PlatformAssetFull[]>(assets);
  const [searchValue, setSearchValue] = useState<string>("");
  const searchHandle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value),
    []
  );
  useEffect(() => {
    const newList = assets.filter((item) =>
      searchValue
        ? ~(item.name + item.asset)
            .toUpperCase()
            .indexOf(searchValue.toUpperCase())
        : true
    );
    setFilteredAssets(newList);
    // if (!!searchValue) setTab(null, "");
  }, [tab, assets, searchValue]);

  const renderList = filteredAssets.filter(({ provider }) => provider === tab);

  return (
    <>
      <Popover
        horizontal={HORIZONTAL_POPOVER_POS.LEFT}
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        anchorEl={anchor}
        noPadding
        onClose={handleCloseDropdown}
      >
        <PopoverContent>
          <TitleBlock>
            <RowItem>
              <GVTabs onChange={setTab} value={tab}>
                {tabs.map((tab) => {
                  const count = filteredAssets.filter(
                    ({ provider }) => provider === tab
                  ).length;
                  return <GVTab count={count} value={tab} label={tab} />;
                })}
              </GVTabs>
            </RowItem>
            <RowItem>
              <GVTextField
                noMargin
                name="queryValue"
                placeholder="Search for assets"
                autoComplete="off"
                adornment={<SearchIcon secondary />}
                adornmentPosition="start"
                onChange={searchHandle}
                value={searchValue}
              />
            </RowItem>
          </TitleBlock>
          <StyledAssets>
            <AddAssetList
              remainder={remainder}
              assets={renderList}
              onDown={handleDown}
              onUp={handleUp}
              onPercentChange={handlePercentChange}
            />
          </StyledAssets>
        </PopoverContent>
      </Popover>
    </>
  );
};

const AddAsset = React.memo(_AddAsset);
export default AddAsset;
