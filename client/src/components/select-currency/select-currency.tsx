import { Currency, Token } from "@pancakeswap/sdk";
import { useCurrencyLogo } from "hooks/currency-logo.hook";
import useIsOpen from "hooks/is-open.hook";
import React from "react";
import { useCallback } from "react";
import { CurrencyItem } from "shared/currency-item/currency-item";
import FilterArrowIcon from "shared/icon/filter-arrow-icon";
import { RowItem } from "shared/row-item/row-item";
import { Row } from "shared/row/row";
import styled from "styled-components";
import { transition } from "styles/mixins";
import SelectCurrencyPopup from "./select-currency-popup";

const StyledRow = styled(Row)`
  ${transition("opacity")}
  &:hover {
    opacity: 0.5;
  }
  &:active {
    transform: translateY(1px);
  }
`;

interface Props {
  selectedCurrency?: Currency | null;
  onCurrencySelect: (currency: Currency) => void;
  otherSelectedCurrency?: Currency | null;
}

const _SelectCurrency: React.FC<Props> = ({
  onCurrencySelect,
  selectedCurrency,
  otherSelectedCurrency
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();

  const logo = useCurrencyLogo(selectedCurrency);

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      setClosePopup();
      onCurrencySelect(currency);
    },
    [setClosePopup, onCurrencySelect]
  );
  return (
    <>
      <StyledRow onClick={setOpenPopup}>
        <RowItem size={"small"}>
          <CurrencyItem
            clickable={false}
            small
            name={selectedCurrency?.symbol}
            logo={logo}
          />
        </RowItem>
        <RowItem style={{ display: "flex" }}>
          <FilterArrowIcon isOpen={isOpenPopup} />
        </RowItem>
      </StyledRow>
      <SelectCurrencyPopup
        open={isOpenPopup}
        onClose={setClosePopup}
        onCurrencySelect={handleCurrencySelect}
        selectedCurrency={selectedCurrency}
        otherSelectedCurrency={otherSelectedCurrency}
      />
    </>
  );
};

const SelectCurrency = React.memo(_SelectCurrency);
export default SelectCurrency;
