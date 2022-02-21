import { Percent } from "@pancakeswap/sdk";
import { ONE_BIPS } from "config/constants";
import { Text } from "shared/text/text";
import styled from "styled-components";
import { $negativeColor, $yellow, $positiveColor } from "styles/colors";
import { warningSeverity } from "utils/prices";

const ErrorText = styled(Text)<{ severity?: 0 | 1 | 2 | 3 | 4 }>`
  color: ${({ theme, severity }) =>
    severity === 3 || severity === 4
      ? $negativeColor
      : severity === 2
      ? $yellow
      : severity === 1
      ? "white"
      : $positiveColor};
`;

/**
 * Formatted version of price impact text with warning colors
 */
export function FormattedPriceImpact({
  priceImpact
}: {
  priceImpact?: Percent;
}) {
  return (
    <ErrorText severity={warningSeverity(priceImpact)}>
      {priceImpact
        ? priceImpact.lessThan(ONE_BIPS)
          ? "<0.01%"
          : `${priceImpact.toFixed(2)}%`
        : "-"}
    </ErrorText>
  );
}
