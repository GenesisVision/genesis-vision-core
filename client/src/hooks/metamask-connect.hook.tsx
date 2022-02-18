import { useWeb3React } from "@web3-react/core";
import { NoEthereumProviderError } from "@web3-react/injected-connector";
import { useCallback, useState } from "react";
import { metamaskConnector } from "utils/web3";
import { useAlerts } from "./alerts.hook";

export const useMetamaskConnect = (): {
  connectMetamask: () => void;
  isPending: boolean;
} => {
  const [isPending, setIsPending] = useState(false);
  const { activate } = useWeb3React();
  const { errorAlert } = useAlerts();

  const connectMetamask = useCallback(() => {
    setIsPending(true);
    activate(metamaskConnector, error => {
      // error instanceof UnsupportedChainIdError. maybe should add it
      if (error instanceof NoEthereumProviderError) {
        errorAlert("Install Metamask extension");
      }
    }).finally(() => {
      setIsPending(false);
    });
  }, [activate, errorAlert]);

  return { isPending, connectMetamask };
};
