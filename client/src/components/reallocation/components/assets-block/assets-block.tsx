import AssetRow from "components/assets/asset-fields/asset-row";
import FundAssetRatio from "components/fund-asset-ratio/fund-asset-ratio";
import FundAssetContainer, {
  FundAssetRemoveType
} from "components/fund-asset/fund-asset.container";
import React, { MouseEventHandler, useCallback, useState } from "react";
import AddButton from "shared/add-button/add-button";
import { Center } from "shared/center/center";
import FormError from "shared/form/form-error/form-error";
import { RowItem } from "shared/row-item/row-item";
import { Row } from "shared/row/row";
import { Text } from "shared/text/text";
import styled from "styled-components";
import { fontSize } from "styles/mixins";
import { $fontSizeParagraph } from "styles/sizes";
import { PlatformAssetFull, ProviderPlatformAssets } from "utils/gv-api.types";
import { generateScheduleText, safeGetElemFromArray } from "utils/helpers";

const StyledCenter = styled(Center)`
  cursor: pointer;
  ${fontSize($fontSizeParagraph)}
  font-weight: 600;
`;

const _AssetsComponent: React.FC<Props> = ({
  providers,
  scheduleMessage,
  error,
  canChange = true,
  assets = [],
  remainder,
  removeHandle = () => () => {},
  addHandle = () => {}
}) => {
  const [hoveringAssetName, setHoveringAssetName] = useState<
    string | undefined
  >(undefined);
  const handleHover = useCallback(
    (asset: string) => () => setHoveringAssetName(asset),
    []
  );
  const handleLeave = useCallback(() => setHoveringAssetName(undefined), []);
  const hasTradingSchedule =
    assets.filter(({ provider }) => provider === "Nasdaq").length > 0;
  const provider =
    providers &&
    safeGetElemFromArray(providers, ({ type }) => type === "Nasdaq");
  const schedule = generateScheduleText(provider?.tradingSchedule);
  return (
    <>
      <Row onlyOffset wide>
        <AssetRow>
          <FundAssetContainer
            assets={assets}
            type={"middle"}
            removable={canChange}
            removeHandle={removeHandle}
            remainder={remainder}
            hoveringAsset={hoveringAssetName}
          />
        </AssetRow>
        <FundAssetRatio
          values={assets}
          handleHover={handleHover}
          handleLeave={handleLeave}
        />
      </Row>
      {error && (
        <Row>
          <FormError small error={error} />
        </Row>
      )}
      {canChange && (
        <Row>
          <StyledCenter onClick={addHandle}>
            <RowItem>
              <AddButton />
            </RowItem>
            <div>Add assets</div>
          </StyledCenter>
        </Row>
      )}
      {hasTradingSchedule && (
        <Row onlyOffset>
          <Row>
            <Text muted>{scheduleMessage}</Text>
          </Row>
          <Row>
            <Text muted>{schedule}</Text>
          </Row>
        </Row>
      )}
    </>
  );
};

interface Props {
  providers?: ProviderPlatformAssets[];
  scheduleMessage?: string;
  assets: PlatformAssetFull[];
  remainder: number;
  removeHandle?: FundAssetRemoveType;
  addHandle?: MouseEventHandler;
  canChange?: boolean;
  error?: string;
  touched?: boolean;
}

const AssetsComponent = React.memo(_AssetsComponent);
export default AssetsComponent;
