import { Trade, TradeType } from "@pancakeswap/sdk";
import { useMemo } from "react";
import { useState } from "react";
import { Text } from "shared/text/text";
import { RefreshIcon } from "shared/icon/refresh-icon";
import {
  computeSlippageAdjustedAmounts,
  computeTradePriceBreakdown,
  formatExecutionPrice,
  warningSeverity
} from "utils/prices";
import { Button } from "shared/button/button";
import { Field } from "state/swap/actions";
import styled from "styled-components";
import { Row } from "shared/row/row";
import { $dividerText } from "styles/sizes";
import { $backgroundColor, $textAccentColor } from "styles/colors";
import { mediaBreakpointLandscapePhone } from "styles/media";
import { RowItem } from "shared/row-item/row-item";
import { LabeledTooltipWithQuestion } from "components/swap-settings/labeled-tooltip-with-question";
import { FormattedPriceImpact } from "components/formatted-price-impact/formatted-price-impact";
import FormError from "shared/form/form-error/form-error";

const $refreshButtonHeight = 18;

const RefreshButton = styled.div`
  display: flex;
  margin-left: 3px;
  align-items: center;
  justify-content: center;
  border-radius: 3.6px;
  width: ${$refreshButtonHeight / $dividerText}px;
  height: ${$refreshButtonHeight / $dividerText}px;
  cursor: pointer;
  font-size: ${28 / $dividerText}px;
  font-weight: 200;
  &:hover {
    background: #253e48;
    svg path {
      stroke: ${$textAccentColor};
    }
  }
  ${mediaBreakpointLandscapePhone(`
      font-size: 28px;
      width: ${$refreshButtonHeight}px;
      height: ${$refreshButtonHeight}px;
    `)}
`;

const SwapModalFooterContainer = styled(Row).attrs({
  onlyOffset: true
})`
  padding: 16px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: ${$backgroundColor};
`;

const RowBetween = styled(Row)`
  justify-content: space-between;
`;

export function ConfirmSwapFooter({
  trade,
  onConfirm,
  allowedSlippage,
  swapErrorMessage,
  disabledConfirm
}: {
  trade: Trade;
  allowedSlippage: number;
  onConfirm: () => void;
  swapErrorMessage: string | undefined;
  disabledConfirm: boolean;
}) {
  const [showInverted, setShowInverted] = useState<boolean>(false);
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [allowedSlippage, trade]
  );
  const { priceImpactWithoutFee, realizedLPFee } = useMemo(
    () => computeTradePriceBreakdown(trade),
    [trade]
  );
  const severity = warningSeverity(priceImpactWithoutFee);

  return (
    <>
      <SwapModalFooterContainer>
        <RowBetween>
          <Text weight={"bold"}>Price</Text>
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              textAlign: "right",
              paddingLeft: "10px"
            }}
          >
            {formatExecutionPrice(trade, showInverted)}
            <RefreshButton onClick={() => setShowInverted(!showInverted)}>
              <RefreshIcon />
            </RefreshButton>
          </Text>
        </RowBetween>
        <RowBetween size={"xsmall"}>
          <RowItem>
            <LabeledTooltipWithQuestion
              label={
                trade.tradeType === TradeType.EXACT_INPUT
                  ? "Minimum received"
                  : "Maximum sold"
              }
              tooltipText={
                "Your transaction will revert if there is a large, unfavorable price movement before it is confirmed."
              }
            />
          </RowItem>
          <RowItem>
            <Text>
              {trade.tradeType === TradeType.EXACT_INPUT
                ? slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4) ?? "-"
                : slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4) ??
                  "-"}{" "}
            </Text>
            <Text>
              {trade.tradeType === TradeType.EXACT_INPUT
                ? trade.outputAmount.currency.symbol
                : trade.inputAmount.currency.symbol}
            </Text>
          </RowItem>
        </RowBetween>
        <RowBetween size={"xsmall"}>
          <RowItem>
            <LabeledTooltipWithQuestion
              label={"Price Impact"}
              tooltipText={
                "The difference between the market price and your price due to trade size."
              }
            />
          </RowItem>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </RowBetween>
        <RowBetween size={"xsmall"}>
          <RowItem>
            <LabeledTooltipWithQuestion
              label={"Liquidity Provider Fee"}
              tooltipText={
                <>
                  <Text>{"For each trade a 0.25% fee is paid"}</Text>
                  <br />
                  <br />
                  <Text>- {"0.17% to LP token holders"}</Text>
                  <br />
                  <Text>- {"0.03% to the Treasury"}</Text>
                  <br />
                  <Text>- {"0.05% towards CAKE buyback and burn"}</Text>
                </>
              }
            />
          </RowItem>
          <Text>
            {realizedLPFee
              ? `${realizedLPFee?.toSignificant(6)} ${
                  trade.inputAmount.currency.symbol
                }`
              : "-"}
          </Text>
        </RowBetween>
      </SwapModalFooterContainer>
      <Row>
        <Button
          color={severity > 2 ? "danger" : "primary"}
          wide
          onClick={onConfirm}
          disabled={disabledConfirm}
        >
          {severity > 2 ? "Swap Anyway" : "Confirm Swap"}
        </Button>
      </Row>
      {swapErrorMessage && (
        <Row size={"small"}>
          <FormError error={swapErrorMessage} />
        </Row>
      )}
    </>
  );
}
