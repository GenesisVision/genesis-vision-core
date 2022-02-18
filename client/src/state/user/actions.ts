import { createAction } from "@reduxjs/toolkit";

export const updateUserSingleHopOnly = createAction<{
  userSingleHopOnly: boolean;
}>("user/updateUserSingleHopOnly");

export const updateUserSlippageTolerance = createAction<{
  userSlippageTolerance: number;
}>("user/updateUserSlippageTolerance");

export const updateUserDeadline = createAction<{ userDeadline: number }>(
  "user/updateUserDeadline"
);

export const updateGasPrice = createAction<{ gasPrice: string }>(
  "user/updateGasPrice"
);
