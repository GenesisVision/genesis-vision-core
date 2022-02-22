import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { ALERT_MESSAGE, IMessage } from "components/alerts/alerts.types";

export interface AlertsState {
  alerts: IMessage[];
}

const initialState: AlertsState = {
  alerts: []
};

export const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    addMessage: (
      state,
      {
        payload: { alertType, text, content }
      }: PayloadAction<{
        text: string;
        alertType: ALERT_MESSAGE;
        content?: React.ReactNode;
      }>
    ) => {
      const newMessage: IMessage = {
        alertType,
        id: nanoid(),
        text,
        content
      };
      state.alerts = [...state.alerts.slice(-2), newMessage];
    },
    removeMessage: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
    removeAllMessages: state => {
      state.alerts = [];
    }
  }
});

export const { addMessage, removeMessage, removeAllMessages } =
  alertsSlice.actions;

export default alertsSlice.reducer;
