import useIsOpen from "hooks/is-open.hook";
import { Button } from "shared/button/button";
import { SettingsIcon } from "shared/icon/settings-icon";
import SwapSettingsPopup from "./swap-settings-popup";

const SwapSettingsButton = () => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();

  return (
    <>
      <Button flexChildren noPadding variant="text" onClick={setOpenPopup}>
        <SettingsIcon />
      </Button>
      <SwapSettingsPopup open={isOpenPopup} onClose={setClosePopup} />
    </>
  );
};

export default SwapSettingsButton;
