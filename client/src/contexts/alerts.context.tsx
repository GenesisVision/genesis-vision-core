import { IMessage, ALERT_MESSAGE } from "components/alerts/alerts.types";
import { createContext, useCallback, useMemo, useState } from "react";

type AlertsContextState = {
  messages: IMessage[];
  removeAllMessages: () => void;
  removeMessage: (id: string) => void;
  addMessage: ({ text, type }: { text: string; type: ALERT_MESSAGE }) => void;
};

export const AlertsContextInitialState = {} as AlertsContextState;

export const AlertsContext = createContext<AlertsContextState>(
  AlertsContextInitialState
);

export const AlertContextProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const addMessage = useCallback(({ type, text }) => {
    setMessages(prevMessages => {
      const newMessage: IMessage = {
        type,
        id: String(Math.random()),
        text
      };
      return [...prevMessages.slice(-2), newMessage];
    });
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages(prevMessages => {
      return prevMessages.filter(message => message.id !== id);
    });
  }, []);

  const removeAllMessages = useCallback(() => setMessages([]), []);

  const value = useMemo(() => {
    return { messages, removeAllMessages, removeMessage, addMessage };
  }, [messages, removeAllMessages, removeMessage, addMessage]);
  return (
    <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>
  );
};
