import React from "react";
import { Center } from "shared/center/center";
import { CurrencyItem } from "shared/currency-item/currency-item";
import Regulator, { TRegulatorHandle } from "shared/regulator/regulator";
import { Text } from "shared/text/text";
import styled from "styled-components";
import { $textAccentColor } from "styles/colors";
import { fontSize, lineHeight } from "styles/mixins";
import { $fontSizeParagraph } from "styles/sizes";
import { PlatformAssetFull } from "utils/gv-api.types";
import { AnyObjectType } from "utils/types";

const StyledCenter = styled(Center)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const StyledInput = styled.input<{ mute?: boolean }>`
  width: 23px;
  display: block;
  background: transparent;
  border-width: 0;
  color: ${$textAccentColor};
  text-align: right;
  &:focus {
    border-width: 0;
    outline-width: 0;
  }
  ${fontSize($fontSizeParagraph)}
  ${lineHeight($fontSizeParagraph)}

    ${({ mute }) => mute && `color: rgba(255, 255, 255, 0.3);`}
`;

export type TRegulatorInputHandle = (
  asset: PlatformAssetFull
) => React.ChangeEventHandler<HTMLInputElement>;

interface Props {
  remainder: number;
  assets: PlatformAssetFull[];
  onDown: TRegulatorHandle;
  onUp: TRegulatorHandle;
  onPercentChange: TRegulatorInputHandle;
}

interface AssetLineProps {
  remainder: number;
  asset: PlatformAssetFull;
  handleDown: TRegulatorHandle;
  handleUp: TRegulatorHandle;
  handlePercentChange: TRegulatorInputHandle;
}

const AssetLine: React.FC<AssetLineProps> = React.memo(
  ({ remainder, asset, handleDown, handleUp, handlePercentChange }) => (
    <tr>
      <td>
        <CurrencyItem
          url={asset.url}
          logo={asset.logoUrl}
          small
          name={asset.name}
          symbol={asset.name}
        />
      </td>
      <td>
        <Text muted>{asset.asset}</Text>
      </td>
      <td>
        <Regulator
          remainder={remainder}
          minValue={asset.mandatoryFundPercent}
          value={asset.percent}
          handleDown={handleDown(asset)}
          handleUp={handleUp(asset)}
        >
          <StyledCenter>
            <StyledInput
              value={asset.percent}
              onChange={handlePercentChange(asset)}
              mute={asset.percent === 0}
            />
            %
          </StyledCenter>
        </Regulator>
      </td>
    </tr>
  )
);

const _AddAssetList: React.FC<Props> = props => {
  const { remainder, assets, onDown, onUp, onPercentChange } = props;
  const providers = Object.keys(
    assets
      .map(({ provider }) => provider)
      .reduce((prev, curr) => {
        if (!prev[curr as string]) return { ...prev, [curr]: curr };
        else return prev;
      }, {} as AnyObjectType)
  );

  return (
    <table>
      <tbody>
        {providers.map(provider => {
          return (
            <>
              {providers.length > 1 && (
                <tr>
                  <td colSpan={3}>
                    <Text muted>{provider}</Text>
                  </td>
                </tr>
              )}
              {assets
                .filter(asset => asset.provider === provider)
                .map(asset => (
                  <AssetLine
                    remainder={remainder}
                    asset={asset}
                    handleDown={onDown}
                    handleUp={onUp}
                    handlePercentChange={onPercentChange}
                    key={asset.id}
                  />
                ))}
            </>
          );
        })}
      </tbody>
    </table>
  );
};

const AddAssetList = React.memo(_AddAssetList);
export default AddAssetList;
