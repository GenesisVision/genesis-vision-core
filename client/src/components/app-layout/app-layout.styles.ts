import { css } from "styled-components";
import { LARGE_DESKTOP, mediaBreakpointLandscapePhone } from "styles/media";
import {
  $fontSizeCommon,
  $fontSizeCommonMobile,
  $paddingBig,
  $paddingBigMobile,
  $paddingSmallMobile,
  $paddingXsmall
} from "styles/sizes";

const PAGE_WIDTH = LARGE_DESKTOP - 40;

const appHorizontalPaddings = css`
  padding-left: ${$paddingSmallMobile}px;
  padding-right: ${$paddingSmallMobile}px;
  ${mediaBreakpointLandscapePhone(`
    padding-left: ${$paddingXsmall}px;
    padding-right :${$paddingXsmall}px;
  `)}
  @media (min-width: ${PAGE_WIDTH}px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const appStyles = css`
  margin: 0 auto;
  @media (min-width: ${PAGE_WIDTH}px) {
    max-width: ${PAGE_WIDTH - $paddingXsmall * 2}px;
  }
`;

export const appWrapperStyles = css`
  position: relative;
  min-height: 100vh;
`;

export const appMainStyles = css`
  ${appHorizontalPaddings}
  padding-bottom: ${2 * $paddingBigMobile + $fontSizeCommonMobile}px;
  padding-top: ${$paddingBigMobile + $fontSizeCommonMobile}px;

  ${mediaBreakpointLandscapePhone(`
    padding-bottom: ${2 * $paddingBig + $fontSizeCommon}px;
  `)}
`;
