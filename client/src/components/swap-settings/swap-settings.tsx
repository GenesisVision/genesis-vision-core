import { DialogBottom } from "shared/dialog/dialog-bottom";
import { DialogTop } from "shared/dialog/dialog-top";
import React from "react";
import { useUserSingleHopOnly } from "state/user/hooks";
import GasSettings from "./gas-settings";
import { LabeledTooltipWithQuestion } from "./labeled-tooltip-with-question";
import GVSwitch from "shared/gv-switch";
import { Row } from "shared/row/row";
import { TransactionSettings } from "./transactions-settings";

const _SwapSettings: React.FC = () => {
  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly();

  const handleChange = () => setSingleHopOnly(!singleHopOnly);
  return (
    <>
      <DialogTop title={"Settings"} />
      <DialogBottom>
        <GasSettings />
        <TransactionSettings />
        <Row style={{ justifyContent: "space-between" }}>
          <LabeledTooltipWithQuestion
            tooltipText={"Restricts swaps to direct pairs only."}
            label={"Disable Multihops"}
          />
          <GVSwitch
            touched={false}
            value={singleHopOnly}
            color="primary"
            onChange={handleChange}
          />
        </Row>
      </DialogBottom>
    </>
  );
};

const SwapSettings = React.memo(_SwapSettings);
export default SwapSettings;
