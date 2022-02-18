import { Currency } from "@pancakeswap/sdk";
import React from "react";
import Dialog, { IDialogProps } from "shared/dialog/dialog";
import SelectCurrencyPopupContainer from "./select-currency-popup.container";

interface Props extends IDialogProps {
  selectedCurrency?: Currency | null;
  otherSelectedCurrency?: Currency | null;
  onCurrencySelect: (currency: Currency) => void;
}

const _SelectCurrencyPopup: React.FC<Props> = ({
  open,
  onClose,
  selectedCurrency,
  otherSelectedCurrency,
  onCurrencySelect
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <SelectCurrencyPopupContainer
        otherSelectedCurrency={otherSelectedCurrency}
        selectedCurrency={selectedCurrency}
        onCurrencySelect={onCurrencySelect}
      />
    </Dialog>
  );
};

const SelectCurrencyPopup = React.memo(_SelectCurrencyPopup);
export default SelectCurrencyPopup;
