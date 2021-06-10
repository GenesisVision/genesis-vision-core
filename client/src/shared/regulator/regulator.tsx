import React, { useCallback } from "react";
import styled from "styled-components";
import { mediaBreakpointLandscapePhone } from "styles/media";
import { fontSize } from "styles/mixins";
import { $dividerText, $fontSizeH4, $fontSizeParagraph } from "styles/sizes";
import { PlatformAssetFull } from "utils/gv-api.types";
import { Sizeable } from "utils/types";

const regulatorWidth = 120;
const regulatorHeight = 25;
const regulatorButtonFontSize = 28;

interface StyledRegulatorProps extends Sizeable {
  mute?: boolean;
}

const StyledRegulator = styled.div<StyledRegulatorProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 3.6px;
  background-color: #2d373f;
  &,
  & div {
    box-sizing: border-box;
  }
  ${({ mute }) =>
    mute &&
    `
    background-color: #202b34;
    color: rgba(255, 255, 255, 0.3);`}

  ${({ size }: Sizeable) =>
    size === "small" &&
    `
    padding: 0 5px;
    min-width: ${regulatorWidth / $dividerText}px;
    height: ${regulatorHeight / 1.2}px;
    ${mediaBreakpointLandscapePhone(`
        min-width: ${regulatorWidth}px;
        height: ${regulatorHeight}px;
    `)}
   `}
   ${({ size }: Sizeable) =>
    size === "middle" &&
    `
    padding: 0 10px;
    min-width: ${regulatorWidth}px;
    height: ${regulatorHeight * 1.5}px;
    ${mediaBreakpointLandscapePhone(`
        min-width: ${regulatorWidth * 2}px;
        height: ${regulatorHeight * 2}px;
    `)}
   `}
`;

const StyledIndicator = styled.div<Sizeable>`
  ${({ size }: Sizeable) =>
    size === "small" && `${fontSize($fontSizeParagraph)};`}
  ${({ size }: Sizeable) => size === "middle" && `${fontSize($fontSizeH4)};`}
`;

const StyledRegulatorButton = styled.div<StyledRegulatorProps>`
  color: #14beb4;
  font-weight: 200;
  user-select: none;
  cursor: pointer;

  ${({ mute }) =>
    mute &&
    `
      cursor: default;
      color: rgba(255, 255, 255, 0.3);`}

  ${({ size }: Sizeable) =>
    size === "small" &&
    `
      padding: 0 7px;
      ${fontSize(regulatorButtonFontSize)}
   `}
   ${({ size }: Sizeable) =>
    size === "middle" &&
    `
        padding: 0 14px;
        ${fontSize(38)}
   `}
`;

const Regulator: React.FC<Props> = ({
  size = "small",
  remainder,
  minValue = 0,
  value,
  handleUp,
  handleDown,
  children,
}) => {
  const handleClickMinus = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      if (value - 1 >= minValue) handleDown(event);
    },
    [value, minValue, handleDown]
  );
  const handleClickPlus = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      if (remainder !== 0) handleUp(event);
    },
    [value, remainder, handleUp]
  );
  return (
    <StyledRegulator size={size} mute={value <= minValue}>
      <StyledRegulatorButton
        size={size}
        mute={value <= minValue}
        onClick={handleClickMinus}
      >
        &minus;
      </StyledRegulatorButton>
      <StyledIndicator size={size}>{children}</StyledIndicator>
      <StyledRegulatorButton
        size={size}
        mute={remainder <= 0}
        onClick={handleClickPlus}
      >
        +
      </StyledRegulatorButton>
    </StyledRegulator>
  );
};

interface Props extends Sizeable {
  remainder: number;
  minValue?: number;
  value: number;
  handleUp: TSymbolClickHandle;
  handleDown: TSymbolClickHandle;
  children: JSX.Element;
}

export type TRegulatorHandle = (asset: PlatformAssetFull) => TSymbolClickHandle;

type TSymbolClickHandle = (event: React.SyntheticEvent<HTMLElement>) => void;

export default Regulator;
