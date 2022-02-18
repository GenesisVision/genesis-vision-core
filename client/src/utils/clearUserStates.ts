import { Dispatch } from "@reduxjs/toolkit";
import { clearAllTransactions } from "state/transactions/actions";

export const clearUserStates = (dispatch: Dispatch<any>, chainId: number) => {
  if (chainId) {
    dispatch(clearAllTransactions({ chainId }));
  }
};
