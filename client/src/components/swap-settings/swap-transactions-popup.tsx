import React from "react";
import Dialog, { IDialogProps } from "shared/dialog/dialog";
import SwapTransactions from "./swap-transactions";

const _SwapTransactionsPopup: React.FC<IDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <SwapTransactions />
    </Dialog>
  );
};

const SwapTransactionsPopup = React.memo(_SwapTransactionsPopup);
export default SwapTransactionsPopup;
