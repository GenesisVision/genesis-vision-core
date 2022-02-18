import useIsOpen from "hooks/is-open.hook";
import { Button } from "shared/button/button";
import { HistoryIcon } from "shared/icon/history-icon";
import SwapTransactionsPopup from "./swap-transactions-popup";

const SwapTransactionsButton = () => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();

  return (
    <>
      <Button flexChildren noPadding variant="text" onClick={setOpenPopup}>
        <HistoryIcon />
      </Button>
      <SwapTransactionsPopup open={isOpenPopup} onClose={setClosePopup} />
    </>
  );
};

export default SwapTransactionsButton;
