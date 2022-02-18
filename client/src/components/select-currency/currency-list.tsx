import React, { MutableRefObject } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import { Currency, ETHER, Token, currencyEquals } from "@pancakeswap/sdk";
import { useMemo } from "react";
import { useCallback } from "react";
import CurrencyRow from "./currency-row";

function currencyKey(currency: Currency): string {
  return currency instanceof Token
    ? currency.address
    : currency === ETHER
    ? "ETHER"
    : "";
}

interface Props {
  currencies: Currency[];
  selectedCurrency?: Currency | null;
  onCurrencySelect: (currency: Currency) => void;
  otherCurrency?: Currency | null;
  fixedListRef?: MutableRefObject<FixedSizeList | undefined>;
  showETH: boolean;
  breakIndex: number | undefined;
}

const _CurrencyList: React.FC<Props> = ({
  currencies,
  selectedCurrency,
  onCurrencySelect,
  otherCurrency,
  fixedListRef,
  showETH,
  breakIndex
}) => {
  const itemData: (Currency | undefined)[] = useMemo(() => {
    let formatted: (Currency | undefined)[] = showETH
      ? [Currency.ETHER, ...currencies]
      : currencies;
    if (breakIndex !== undefined) {
      formatted = [
        ...formatted.slice(0, breakIndex),
        undefined,
        ...formatted.slice(breakIndex, formatted.length)
      ];
    }
    return formatted.filter(Boolean);
  }, [breakIndex, currencies, showETH]);

  const Row = useCallback(
    ({ data, index, style }) => {
      const currency: Currency = data[index];
      const isSelected = Boolean(
        selectedCurrency && currencyEquals(selectedCurrency, currency)
      );
      const otherSelected = Boolean(
        otherCurrency && currencyEquals(otherCurrency, currency)
      );
      const handleSelect = () => onCurrencySelect(currency);

      return (
        <CurrencyRow
          style={style}
          currency={currency}
          isSelected={isSelected}
          onSelect={handleSelect}
          otherSelected={otherSelected}
        />
      );
    },
    [onCurrencySelect, otherCurrency, selectedCurrency]
  );

  const itemKey = useCallback(
    (index: number, data: any) => currencyKey(data[index]),
    []
  );

  return (
    <AutoSizer>
      {({ width, height }) => (
        <FixedSizeList
          height={height}
          width={width}
          ref={fixedListRef as any}
          itemData={itemData}
          itemCount={itemData.length}
          itemSize={45}
          itemKey={itemKey}
        >
          {Row}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

const CurrencyList = React.memo(_CurrencyList);
export default CurrencyList;
