import { Trade, TradeType } from "@pancakeswap/sdk";
import { Text } from "shared/text/text";
import { useMemo } from "react";
import { Button } from "shared/button/button";
import { Row } from "shared/row/row";
import { Field } from "state/swap/actions";
import {
  computeSlippageAdjustedAmounts,
  computeTradePriceBreakdown,
  warningSeverity
} from "utils/prices";
import { useCurrencyLogo } from "hooks/currency-logo.hook";
import { RowItem } from "shared/row-item/row-item";
import { CurrencyItem } from "shared/currency-item/currency-item";
import { ArrowDownIcon } from "shared/icon/arrow-down-icon";
import { InfoIcon } from "shared/icon/info-icon";
import styled from "styled-components";

const SwapShowAcceptChanges = styled(Row)`
  background: #5c5322;
  padding: 10px;
  border-radius: 10px;
  justify-content: space-between;
`;

export function ConfirmSwapHeader({
  trade,
  allowedSlippage,
  showAcceptChanges,
  onAcceptChanges
}: {
  trade: Trade;
  allowedSlippage: number;
  showAcceptChanges: boolean;
  onAcceptChanges: () => void;
}) {
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [trade, allowedSlippage]
  );
  const { priceImpactWithoutFee } = useMemo(
    () => computeTradePriceBreakdown(trade),
    [trade]
  );
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee);

  const inputLogo = useCurrencyLogo(trade.inputAmount.currency);
  const outputLogo = useCurrencyLogo(trade.outputAmount.currency);

  const amount =
    trade.tradeType === TradeType.EXACT_INPUT
      ? slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(6)
      : slippageAdjustedAmounts[Field.INPUT]?.toSignificant(6);
  const symbol =
    trade.tradeType === TradeType.EXACT_INPUT
      ? trade.outputAmount.currency.symbol
      : trade.inputAmount.currency.symbol;

  const tradeInfoText =
    trade.tradeType === TradeType.EXACT_INPUT
      ? `Output is estimated. You will receive at least ${amount} ${symbol} or the transaction will revert.`
      : `Input is estimated. You will sell at most ${amount} ${symbol} or the transaction will revert.`;

  const [estimatedText, transactionRevertText] = tradeInfoText.split(
    `${amount} ${symbol}`
  );

  return (
    <>
      <Row style={{ justifyContent: "space-between" }}>
        <RowItem>
          <Row>
            <RowItem size={"small"}>
              <CurrencyItem clickable={false} small logo={inputLogo} />
            </RowItem>
            <Text
              weight={"bold"}
              color={
                showAcceptChanges && trade.tradeType === TradeType.EXACT_OUTPUT
                  ? "yellow"
                  : "white"
              }
            >
              {trade.inputAmount.toSignificant(6)}
            </Text>
          </Row>
        </RowItem>
        <RowItem>
          <Text weight={"bold"}>{trade.inputAmount.currency.symbol}</Text>
        </RowItem>
      </Row>
      <Row size={"small"} style={{ marginLeft: 3 }}>
        <ArrowDownIcon />
      </Row>
      <Row style={{ justifyContent: "space-between" }} size={"small"}>
        <RowItem>
          <Row>
            <RowItem size={"small"}>
              <CurrencyItem clickable={false} small logo={outputLogo} />
            </RowItem>
            <Text
              weight={"bold"}
              color={
                priceImpactSeverity > 2
                  ? "danger"
                  : showAcceptChanges &&
                    trade.tradeType === TradeType.EXACT_INPUT
                  ? "yellow"
                  : "white"
              }
            >
              {trade.outputAmount.toSignificant(6)}
            </Text>
          </Row>
        </RowItem>
        <RowItem>
          <Text weight={"bold"}>{trade.outputAmount.currency.symbol}</Text>
        </RowItem>
      </Row>
      {showAcceptChanges && (
        <SwapShowAcceptChanges>
          <RowItem style={{ display: "flex" }}>
            <RowItem style={{ display: "flex" }} size={"xsmall"}>
              <InfoIcon />
            </RowItem>
            <Text weight={"bold"}>Price Updated</Text>
          </RowItem>
          <Button size={"small"} onClick={onAcceptChanges}>
            Accept
          </Button>
        </SwapShowAcceptChanges>
      )}
      <Row>
        <Text muted>
          {estimatedText}
          <Text weight={"bold"} color={"white"}>
            {amount} {symbol}
          </Text>
          {transactionRevertText}
        </Text>
      </Row>
    </>
  );
}
