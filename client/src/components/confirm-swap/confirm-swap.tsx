import { Trade } from "@pancakeswap/sdk";
import React from "react";
import { DialogBottom } from "shared/dialog/dialog-bottom";
import { DialogTop } from "shared/dialog/dialog-top";

interface ConfirmSwapProps {
  onClose: () => void;
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

const _ConfirmSwap: React.FC<ConfirmSwapProps> = ({ onClose }) => {
  return (
    <>
      <DialogTop title={``} />
      <DialogBottom>
        <div>dsa</div>
      </DialogBottom>
    </>
  );
};

const ConfirmSwap = React.memo(_ConfirmSwap);
export default ConfirmSwap;
