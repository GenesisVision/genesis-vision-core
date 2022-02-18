import { ChainId } from "@pancakeswap/sdk";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "state";
import {
  updateGasPrice,
  updateUserSingleHopOnly,
  updateUserSlippageTolerance
} from "./actions";
import { GAS_PRICE_GWEI } from "./helpers";

export function useGasPriceManager(): [string, (userGasPrice: string) => void] {
  const dispatch = useDispatch();
  const userGasPrice = useGasPrice();

  const setGasPrice = useCallback(
    (gasPrice: string) => {
      dispatch(updateGasPrice({ gasPrice }));
    },
    [dispatch]
  );

  return [userGasPrice, setGasPrice];
}

export function useUserSingleHopOnly(): [
  boolean,
  (newSingleHopOnly: boolean) => void
] {
  const dispatch = useDispatch();

  const singleHopOnly = useSelector<
    AppState,
    AppState["user"]["userSingleHopOnly"]
  >(state => state.user.userSingleHopOnly);

  const setSingleHopOnly = useCallback(
    (newSingleHopOnly: boolean) => {
      dispatch(
        updateUserSingleHopOnly({ userSingleHopOnly: newSingleHopOnly })
      );
    },
    [dispatch]
  );

  return [singleHopOnly, setSingleHopOnly];
}

export function useUserSlippageTolerance(): [
  number,
  (slippage: number) => void
] {
  const dispatch = useDispatch();
  const userSlippageTolerance = useSelector<
    AppState,
    AppState["user"]["userSlippageTolerance"]
  >(state => {
    return state.user.userSlippageTolerance;
  });

  const setUserSlippageTolerance = useCallback(
    (slippage: number) => {
      dispatch(
        updateUserSlippageTolerance({ userSlippageTolerance: slippage })
      );
    },
    [dispatch]
  );

  return [userSlippageTolerance, setUserSlippageTolerance];
}

export function useGasPrice(): string {
  const chainId = process.env.REACT_APP_CHAIN_ID;
  const userGas = useSelector<AppState, AppState["user"]["gasPrice"]>(
    state => state.user.gasPrice
  );
  return chainId === ChainId.MAINNET.toString()
    ? userGas
    : GAS_PRICE_GWEI.testnet;
}
