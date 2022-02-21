import { Trade, TradeType } from "@pancakeswap/sdk";
import { FormattedPriceImpact } from "components/formatted-price-impact/formatted-price-impact";
import { LabeledTooltipWithQuestion } from "components/swap-settings/labeled-tooltip-with-question";
import useLastTruthy from "hooks/last.hook";
import SwapRoute from "./swap-route";
import { RowItem } from "shared/row-item/row-item";
import { Row } from "shared/row/row";
import { Text } from "shared/text/text";
import { Field } from "state/swap/actions";
import { useUserSlippageTolerance } from "state/user/hooks";
import styled from "styled-components";
import { $backgroundColor } from "styles/colors";
import {
  computeSlippageAdjustedAmounts,
  computeTradePriceBreakdown
} from "utils/prices";

const RowBetween = styled(Row)`
  justify-content: space-between;
`;

const SwapModalFooterContainer = styled(Row).attrs({
  onlyOffset: true
})`
  padding: 16px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: ${$backgroundColor};
`;

function TradeSummary({
  trade,
  allowedSlippage
}: {
  trade: Trade;
  allowedSlippage: number;
}) {
  const { priceImpactWithoutFee, realizedLPFee } =
    computeTradePriceBreakdown(trade);
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT;
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(
    trade,
    allowedSlippage
  );

  return (
    <>
      <RowBetween>
        <RowItem>
          <LabeledTooltipWithQuestion
            label={isExactIn ? "Minimum received" : "Maximum sold"}
            tooltipText={
              "Your transaction will revert if there is a large, unfavorable price movement before it is confirmed."
            }
          />
        </RowItem>
        <RowItem>
          <Text>
            {isExactIn
              ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${
                  trade.outputAmount.currency.symbol
                }` ?? "-"
              : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)} ${
                  trade.inputAmount.currency.symbol
                }` ?? "-"}
          </Text>
        </RowItem>
      </RowBetween>
      <RowBetween size={"xsmall"}>
        <RowItem>
          <LabeledTooltipWithQuestion
            label={"Price Impact"}
            tooltipText={
              "The difference between the market price and estimated price due to trade size."
            }
          />
        </RowItem>
        <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
      </RowBetween>
      <RowBetween size={"xsmall"}>
        <RowItem size={"zero"}>
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
            ? `${realizedLPFee?.toSignificant(4)} ${
                trade.inputAmount.currency.symbol
              }`
            : "-"}
        </Text>
      </RowBetween>
    </>
  );
}

export interface AdvancedSwapDetailsProps {
  trade?: Trade;
}

export function AdvancedSwapDetails({ trade }: AdvancedSwapDetailsProps) {
  const lastTrade = useLastTruthy(trade);
  const actualTrade = trade ?? lastTrade ?? undefined;
  const [allowedSlippage] = useUserSlippageTolerance();

  const showRoute = Boolean(trade && trade.route.path.length > 2);

  return (
    <>
      {actualTrade && (
        <SwapModalFooterContainer>
          <TradeSummary trade={actualTrade} allowedSlippage={allowedSlippage} />
          {showRoute && (
            <RowBetween size={"xsmall"}>
              <RowItem size={"zero"}>
                <LabeledTooltipWithQuestion
                  label={"Route"}
                  tooltipText={
                    "Routing through these tokens resulted in the best price for your trade."
                  }
                />
              </RowItem>
              <SwapRoute trade={actualTrade} />
            </RowBetween>
          )}
        </SwapModalFooterContainer>
      )}
    </>
  );
}
