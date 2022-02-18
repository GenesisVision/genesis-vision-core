import { Currency } from "@pancakeswap/sdk";
import SelectCurrency from "components/select-currency/select-currency";
import { Text } from "shared/text/text";
import { useCurrencyBalance } from "hooks/wallet";
import useActiveWeb3React from "hooks/web3active.hook";
import React from "react";
import { Row } from "shared/row/row";
import { Input as NumericalInput } from "./numerical-input";
import { RowItem } from "shared/row-item/row-item";

interface CurrencyInputPanelProps {
  value: string;
  onUserInput: (value: string) => void;
  onMax?: () => void;
  showMaxButton: boolean;
  label?: string;
  onCurrencySelect: (currency: Currency) => void;
  currency?: Currency | null;
  otherCurrency?: Currency | null;
}
export function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  otherCurrency
}: CurrencyInputPanelProps) {
  const { account } = useActiveWeb3React();
  const selectedCurrencyBalance = useCurrencyBalance(
    account ?? undefined,
    currency ?? undefined
  );

  return (
    <>
      <Row wide>
        <RowItem>
          <SelectCurrency
            onCurrencySelect={onCurrencySelect}
            otherSelectedCurrency={otherCurrency}
            selectedCurrency={currency}
          />
        </RowItem>
        <RowItem style={{ marginLeft: "auto" }}>
          {account && (
            <Text
              style={{ cursor: onMax ? "pointer" : "default" }}
              onClick={onMax}
            >
              {!!currency
                ? `Balance: ${
                    selectedCurrencyBalance?.toSignificant(6) ?? "Loading"
                  }`
                : " -"}
            </Text>
          )}
        </RowItem>
      </Row>
      <Row wide>
        <NumericalInput
          value={value}
          onUserInput={onUserInput}
          onMax={
            account && currency && showMaxButton && label !== "To"
              ? onMax
              : undefined
          }
        />
      </Row>
    </>
  );
}
