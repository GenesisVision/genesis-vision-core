import { Currency } from "@pancakeswap/sdk";
import CurrencyBalance from "components/currency-balance/currency-balance";
import { useCurrencyLogo } from "hooks/currency-logo.hook";
import React, { CSSProperties } from "react";
import { CurrencyItem } from "shared/currency-item/currency-item";
import { RowItem } from "shared/row-item/row-item";
import { Row } from "shared/row/row";
import styled from "styled-components";
import { transition } from "styles/mixins";

const StyledRow = styled(Row)<{ disabled: boolean; selected: boolean }>`
  ${transition("opacity")}
  cursor: ${({ disabled }) => !disabled && "pointer"};
  pointer-events: ${({ disabled }) => disabled && "none"};
  opacity: ${({ disabled, selected }) => (disabled || selected ? 0.3 : 1)};
  &:hover {
    opacity: 0.6;
  }
`;

const StyledRowItem = styled(RowItem)`
  margin-left: auto;
  padding-right: 10px;
`;

interface Props {
  currency: Currency;
  onSelect: () => void;
  isSelected: boolean;
  otherSelected: boolean;
  style: CSSProperties;
}

const _CurrencyRow: React.FC<Props> = ({
  currency,
  onSelect,
  isSelected,
  otherSelected,
  style
}) => {
  const logo = useCurrencyLogo(currency);
  return (
    <StyledRow
      style={style}
      disabled={isSelected}
      onClick={() => (isSelected ? null : onSelect())}
      selected={otherSelected}
      size={"zero"}
    >
      <RowItem>
        <CurrencyItem
          symbol={currency.symbol}
          logo={logo}
          name={currency.name}
          small
          clickable={false}
          showSymbolWithName
        />
      </RowItem>
      <StyledRowItem>
        <CurrencyBalance currency={currency} />
      </StyledRowItem>
    </StyledRow>
  );
};

const CurrencyRow = React.memo(_CurrencyRow);
export default CurrencyRow;
