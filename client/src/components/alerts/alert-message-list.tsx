import { AlertsContext } from "contexts/alerts.context";
import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "shared/button/button";
import styled from "styled-components";
import { $paddingSmall } from "styles/sizes";
import AlertMessage from "./alert-message";

const List = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  padding: ${$paddingSmall / 2}px;
  z-index: 9999;
  pointer-events: none;

  * {
    pointer-events: visible;
  }
`;

const _AlertMessageList: React.FC = () => {
  const { messages, removeAllMessages, removeMessage } =
    useContext(AlertsContext);

  const history = useHistory();

  useEffect(() => {
    const handleChange = () => {
      removeAllMessages();
    };
    const unlisten = history.listen(handleChange);
    return unlisten;
  }, []);

  const children = messages.map(message => (
    <AlertMessage key={message.id} message={message} onClick={removeMessage} />
  ));

  if (messages.length > 1) {
    children.push(
      <Button color="primary" onClick={removeAllMessages}>
        Clear all
      </Button>
    );
  }

  return <List>{children}</List>;
};

const AlertMessageList = React.memo(_AlertMessageList);
export default AlertMessageList;
