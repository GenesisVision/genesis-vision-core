import { CurrencyItem } from "shared/currency-item/currency-item";
import { RowItem } from "shared/row-item/row-item";
import { Row } from "shared/row/row";
import styled, { css } from "styled-components";
import { $landingBgGray, $landingItemBg, $textLightColor } from "styles/colors";
import { mediaBreakpointLandscapePhone } from "styles/media";
import {
  adaptiveBorderRadius,
  adaptiveFullPadding,
  fontSize,
  height,
  lineHeight,
} from "styles/mixins";
import {
  $borderRadiusMiddle,
  $fontSizeSmall,
  $paddingXsmall,
  $paddingXxsmall,
} from "styles/sizes";
import { FundAssetViewType } from "utils/gv-api.types";

const $assetHeight = 40;
const $removeButtonSize = 18;
const $removeButtonSizeMobile = $removeButtonSize / 1.2;
const $removeButtonColor = "#293842";

export const FundAssetCurrencyItem = styled(CurrencyItem)<{
  type: FundAssetViewType;
}>`
  ${({ type }) => {
    switch (type) {
      case "large":
        return "white-space: nowrap;";
      case "short":
        return "opacity: 0.4;";
    }
  }}
`;

export const FundAssetRemoveButton = styled.div`
  position: absolute;
  top: -${$removeButtonSizeMobile / 2}px;
  right: -${$removeButtonSizeMobile / 2}px;
  width: ${$removeButtonSizeMobile}px;
  height: ${$removeButtonSizeMobile}px;
  background: ${$removeButtonColor};
  border: solid 2px #131e26;
  border-radius: ${$removeButtonSizeMobile}px;
  font-size: 20px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(45deg);
  cursor: pointer;
  user-select: none;
  ${mediaBreakpointLandscapePhone(`
    top: -${$removeButtonSize / 2}px;
    right: -${$removeButtonSize / 2}px;
    width: ${$removeButtonSize}px;
    height: ${$removeButtonSize}px;
    border-radius: ${$removeButtonSize}px;
    font-size: 20px;
  `)}
`;

export const fundAssetStyle = css`
  ${height($assetHeight)};
  ${fontSize($fontSizeSmall)};
  ${lineHeight($fontSizeSmall)};
  ${adaptiveFullPadding($paddingXxsmall)};
  ${adaptiveBorderRadius($borderRadiusMiddle)};
  box-sizing: border-box;
  font-weight: 400;
  position: relative;
  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;

export const FundAssetRow = styled(Row)<{ lightTheme?: boolean }>`
  ${fundAssetStyle};
  background: rgba(255, 255, 255, 0.02);
  color: ${$textLightColor};
  ${({ lightTheme }) =>
    lightTheme &&
    `
      background-color: ${$landingBgGray};
      font-weight: 600;
      color: ${$landingItemBg};
  `}
`;

export const FundAssetRemainder = styled(RowItem)`
  ${fundAssetStyle};
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59, 205, 189, 0.1);
  color: #14beb4;
`;

export const FundAssets = styled(Row)`
  justify-content: flex-start;
`;

export const FundAssetsContainer = styled.div`
  padding: ${$paddingXsmall}px;
  display: flex;
  flex-wrap: wrap;
  width: 90px;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;

  ${mediaBreakpointLandscapePhone(`width: 170px;`)}
`;

export const HidedAssetsContainer = styled.div`
  cursor: pointer;
`;

export const HidedAssetsCount = styled(Row)<{ canExpand?: boolean }>`
  ${fundAssetStyle};
  ${({ canExpand }) =>
    canExpand
      ? `
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }`
      : `  &:hover {
    background: none;
  }
  }`}
`;
