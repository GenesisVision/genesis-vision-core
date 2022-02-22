import { ALERT_MESSAGE } from "components/alerts/alerts.types";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addMessage, removeAllMessages } from "./reducer";

export const useAlerts = () => {
  const dispatch = useDispatch();
  const successAlert = useCallback(
    (text: string, content?: React.ReactNode) => {
      dispatch(addMessage({ text, alertType: ALERT_MESSAGE.SUCCESS, content }));
    },
    [dispatch]
  );
  const warningAlert = useCallback(
    (text: string, content?: React.ReactNode) => {
      dispatch(addMessage({ text, alertType: ALERT_MESSAGE.WARNING, content }));
    },
    [dispatch]
  );
  const errorAlert = useCallback(
    (text: string, content?: React.ReactNode) => {
      dispatch(addMessage({ text, alertType: ALERT_MESSAGE.ERROR, content }));
    },
    [dispatch]
  );
  return {
    successAlert,
    warningAlert,
    errorAlert,
    clearAllAlerts: removeAllMessages
  };
};
