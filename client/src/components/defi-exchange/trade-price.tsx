import React from "react";
import { Price } from "@pancakeswap/sdk";
import { Text } from "shared/text/text";
import { RefreshIcon } from "shared/icon/refresh-icon";
import styled from "styled-components";
import { $textAccentColor } from "styles/colors";
import { mediaBreakpointLandscapePhone } from "styles/media";
import { $dividerText } from "styles/sizes";
import { Center } from "shared/center/center";
import { RowItem } from "shared/row-item/row-item";

const $swapButtonHeight = 18;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3.6px;
  color: #14beb4;
  background: #253e48;
  width: ${$swapButtonHeight / $dividerText}px;
  height: ${$swapButtonHeight / $dividerText}px;
  cursor: pointer;
  font-size: ${28 / $dividerText}px;
  font-weight: 200;
  &:hover {
    background: rgb(21, 187, 175);
    svg path {
      stroke: ${$textAccentColor};
    }
  }
  ${mediaBreakpointLandscapePhone(`
    font-size: 28px;
    width: ${$swapButtonHeight}px;
    height: ${$swapButtonHeight}px;
  `)}
`;

interface TradePriceProps {
  price?: Price;
  showInverted: boolean;
  setShowInverted: (showInverted: boolean) => void;
}

export default function TradePrice({
  price,
  showInverted,
  setShowInverted
}: TradePriceProps) {
  const formattedPrice = showInverted
    ? price?.toSignificant(6)
    : price?.invert()?.toSignificant(6);

  const show = Boolean(price?.baseCurrency && price?.quoteCurrency);
  const label = showInverted
    ? `${price?.quoteCurrency?.symbol} per ${price?.baseCurrency?.symbol}`
    : `${price?.baseCurrency?.symbol} per ${price?.quoteCurrency?.symbol}`;

  return (
    <Center>
      {show ? (
        <>
          <RowItem size={"xsmall"}>
            <Text>
              {formattedPrice ?? "-"} {label}
            </Text>
          </RowItem>
          <RowItem>
            <Container onClick={() => setShowInverted(!showInverted)}>
              <RefreshIcon />
            </Container>
          </RowItem>
        </>
      ) : (
        "-"
      )}
    </Center>
  );
}
