import React from "react";
import { useMetamaskConnect } from "hooks/metamask-connect.hook";
import { Button } from "shared/button/button";

const ConnectWalletButton = () => {
  const { isPending, connectMetamask } = useMetamaskConnect();

  return (
    <Button wide onClick={connectMetamask} disabled={isPending}>
      Connect wallet
    </Button>
  );
};

export default ConnectWalletButton;
