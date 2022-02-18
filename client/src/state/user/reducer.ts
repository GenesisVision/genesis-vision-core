import { createReducer } from "@reduxjs/toolkit";
import {
  DEFAULT_DEADLINE_FROM_NOW,
  INITIAL_ALLOWED_SLIPPAGE
} from "config/constants";

import {
  updateGasPrice,
  updateUserDeadline,
  updateUserSingleHopOnly,
  updateUserSlippageTolerance
} from "./actions";
import { GAS_PRICE_GWEI } from "./helpers";

export interface UserState {
  // only allow swaps on direct pairs
  userSingleHopOnly: boolean;

  // user defined slippage tolerance in bips, used in all txns
  userSlippageTolerance: number;

  // deadline set by user in minutes, used in all txns
  userDeadline: number;

  gasPrice: string;
}

export const initialState: UserState = {
  userSingleHopOnly: false,
  userSlippageTolerance: INITIAL_ALLOWED_SLIPPAGE,
  userDeadline: DEFAULT_DEADLINE_FROM_NOW,
  gasPrice: GAS_PRICE_GWEI.default
};

export default createReducer(initialState, builder =>
  builder
    .addCase(updateUserSlippageTolerance, (state, action) => {
      state.userSlippageTolerance = action.payload.userSlippageTolerance;
    })
    .addCase(updateUserDeadline, (state, action) => {
      state.userDeadline = action.payload.userDeadline;
    })
    .addCase(updateUserSingleHopOnly, (state, action) => {
      state.userSingleHopOnly = action.payload.userSingleHopOnly;
    })
    .addCase(updateGasPrice, (state, action) => {
      state.gasPrice = action.payload.gasPrice;
    })
);
