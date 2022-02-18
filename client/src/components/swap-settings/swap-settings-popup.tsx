import React from "react";
import Dialog, { IDialogProps } from "shared/dialog/dialog";
import SwapSettings from "./swap-settings";

const _SwapSettingsPopup: React.FC<IDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <SwapSettings />
    </Dialog>
  );
};

const SwapSettingsPopup = React.memo(_SwapSettingsPopup);
export default SwapSettingsPopup;
