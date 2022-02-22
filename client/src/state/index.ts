import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { save, load } from "redux-localstorage-simple";
import swap from "./swap/reducer";
import multicall from "./multicall/reducer";
import alerts from "./alerts/reducer";
import blockReducer from "./block";
import cloneDeep from "lodash/cloneDeep";
import user, { initialState as userInitialState } from "./user/reducer";
import transactions, {
  initialState as transactionsInitialState
} from "./transactions/reducer";

const PERSISTED_KEYS: string[] = ["user", "transactions"];

const safeCloneDeep = <T>(state: T) => {
  try {
    return JSON.parse(JSON.stringify(state)) as T;
  } catch (error) {
    console.error(error);
    return cloneDeep(state);
  }
};

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    block: blockReducer,
    multicall,
    swap,
    user,
    transactions,
    alerts
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({ thunk: true }),
    save({ states: PERSISTED_KEYS, debounce: 1000 })
  ],
  preloadedState: load({
    states: PERSISTED_KEYS,
    preloadedState: {
      user: safeCloneDeep(userInitialState),
      transactions: safeCloneDeep(transactionsInitialState)
    }
  })
});

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch();

export default store;
