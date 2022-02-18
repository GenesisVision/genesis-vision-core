import { Trade } from "@pancakeswap/sdk";
import React from "react";
import Dialog, { IDialogProps } from "shared/dialog/dialog";
import ConfirmSwap from "./confirm-swap";

interface ConfirmSwapPopupProps extends IDialogProps {
  trade?: Trade;
  originalTrade?: Trade;
  attemptingTxn: boolean;
  txHash?: string;
  allowedSlippage: number;
  onAcceptChanges: () => void;
  onConfirm: () => void;
  swapErrorMessage?: string;
  customOnDismiss?: () => void;
}

const _ConfirmSwapPopup: React.FC<ConfirmSwapPopupProps> = ({
  trade,
  originalTrade,
  onAcceptChanges,
  allowedSlippage,
  onConfirm,
  onClose,
  open,
  customOnDismiss,
  swapErrorMessage,
  attemptingTxn,
  txHash
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <ConfirmSwap
        onClose={onClose}
        trade={trade}
        originalTrade={originalTrade}
        onAcceptChanges={onAcceptChanges}
        attemptingTxn={attemptingTxn}
        txHash={txHash}
        allowedSlippage={allowedSlippage}
        onConfirm={onConfirm}
        swapErrorMessage={swapErrorMessage}
        customOnDismiss={customOnDismiss}
      />
    </Dialog>
  );
};

const ConfirmSwapPopup = React.memo(_ConfirmSwapPopup);
export default ConfirmSwapPopup;
