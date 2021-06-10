import React from "react";
import Dialog, { IDialogProps } from "shared/dialog/dialog";

interface Props extends IDialogProps {
  active: string;
}

const _ActivePopup: React.FC<Props> = ({ open, onClose, active }) => {
  return (
    <Dialog open={open} onClose={onClose} top>
      <div></div>
      {/* <ActivePopupContainer active={active} /> */}
    </Dialog>
  );
};

const ActivePopup = React.memo(_ActivePopup);
export default ActivePopup;
