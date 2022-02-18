import { ALERT_MESSAGE } from "components/alerts/alerts.types";
import { AlertsContext } from "contexts/alerts.context";
import { useCallback, useContext } from "react";

export const useAlerts = () => {
  const { addMessage, removeAllMessages } = useContext(AlertsContext);
  const successAlert = useCallback(
    (text: string) => {
      addMessage({ text, type: ALERT_MESSAGE.SUCCESS });
    },
    [addMessage]
  );
  const warningAlert = useCallback(
    (text: string) => {
      addMessage({ text, type: ALERT_MESSAGE.WARNING });
    },
    [addMessage]
  );
  const errorAlert = useCallback(
    (text: string) => {
      addMessage({ text, type: ALERT_MESSAGE.ERROR });
    },
    [addMessage]
  );
  return {
    successAlert,
    warningAlert,
    errorAlert,
    clearAllAlerts: removeAllMessages
  };
};
