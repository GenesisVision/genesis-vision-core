import React from "react";
import Dialog, { IDialogProps } from "shared/dialog/dialog";
import { WrappedTokenInfo } from "state/lists/hooks";
import SwapWarning from "./swap-warning";

interface SwapWarningPopupProps extends IDialogProps {
  swapCurrency: WrappedTokenInfo;
}

const _SwapWarningPopup: React.FC<SwapWarningPopupProps> = ({
  open,
  onClose,
  swapCurrency
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <SwapWarning swapCurrency={swapCurrency} onClose={onClose} />
    </Dialog>
  );
};

const SwapWarningPopup = React.memo(_SwapWarningPopup);
export default SwapWarningPopup;
