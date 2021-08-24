import React from "react";
import styled from "styled-components";
import { $secondaryBackgroundColor } from "styles/colors";
import {
  adaptiveFullPadding,
  fontSize,
  horizontalPaddings,
  verticalPaddings
} from "styles/mixins";
import {
  $fontSizeCommon,
  $modalWidth,
  $paddingSmall,
  $paddingXsmall,
  $popoverPaddingLarge,
  $popoverPaddingMedium,
  $popoverPaddingSmall
} from "styles/sizes";
import { SizesType } from "utils/types";

interface IPopoverContentCardBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  dark?: boolean;
  className?: string;
  size?: SizesType | null;
  stretched?: boolean;
  fixed?: boolean;
}

export const PopoverContentCardBlock = styled.div<IPopoverContentCardBlockProps>`
  box-sizing: border-box;
  background-color: ${({ dark }) =>
    dark ? $secondaryBackgroundColor : "#23303c"};
  ${({ fixed }) =>
    fixed &&
    `
    max-width: ${$modalWidth}px;
  `};
  ${({ stretched, size = "middle" }) => {
    switch (size) {
      case "small":
        return `
        ${fontSize($fontSizeCommon)};
        ${adaptiveFullPadding($popoverPaddingSmall)};
        ${
          stretched &&
          `
            ${horizontalPaddings($popoverPaddingSmall)};
            ${verticalPaddings($paddingXsmall)};
        `
        }
        `;
      case "middle":
        return `
        ${adaptiveFullPadding($popoverPaddingMedium)};
        ${
          stretched &&
          `
            ${horizontalPaddings($popoverPaddingMedium)};
            ${verticalPaddings($paddingSmall)};
        `
        }
        `;
      case "large":
        return adaptiveFullPadding($popoverPaddingLarge);
    }
  }};
`;
