import React, { useCallback } from "react";
import styled from "styled-components";
import { $panelBackgroundColor, $positiveColor } from "styles/colors";
import { mediaBreakpointLandscapePhone } from "styles/media";
import { $boxShadow4 } from "styles/shadow";
import {
  $borderRadiusMiddle,
  $fontSizeCommon,
  $fontSizeH4,
  $fontSizeSmall,
  $paddingSmall
} from "styles/sizes";
import { ALERT_MESSAGE, IMessage } from "./alerts.types";

export const ALERT_CLOSE_CLASS = "alert-message-list__close";
export const ALERT_TEXT_CLASS = "alert-message-list__text";

interface Props {
  onClick: (id: string) => void;
  message: IMessage;
}

const CloseContainer = styled.div`
  padding-left: ${$paddingSmall / 4}px;
  cursor: pointer;
`;

const CloseButton = styled.div`
  transform: rotate(45deg);
  font-weight: 800;
  font-size: ${$fontSizeH4 * 1.5}px;
  line-height: ${$fontSizeH4}px;
`;

const Text = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 300px;
  padding: ${$paddingSmall / 4}px;
`;

const Container = styled.div<{ type?: ALERT_MESSAGE }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  font-weight: 400;
  font-size: ${$fontSizeSmall}px;
  padding: ${$paddingSmall / 4}px;
  margin-bottom: ${$paddingSmall / 2}px;
  border-radius: ${$borderRadiusMiddle}px;
  box-shadow: ${$boxShadow4};

  ${mediaBreakpointLandscapePhone(`
    font-size: ${$fontSizeCommon}px;
    padding: ${$paddingSmall / 4}px;
  `)}

  color: ${({ type }) => {
    switch (type) {
      case ALERT_MESSAGE.ERROR:
        return "#eb3b5a";
      case ALERT_MESSAGE.WARNING:
      case ALERT_MESSAGE.SUCCESS:
      default:
        return $panelBackgroundColor;
    }
  }};
  background-color: ${({ type }) => {
    switch (type) {
      case ALERT_MESSAGE.ERROR:
        return "#392D2F";
      case ALERT_MESSAGE.WARNING:
        return "#ecdf75";
      case ALERT_MESSAGE.SUCCESS:
      default:
        return $positiveColor;
    }
  }};
`;

const _AlertMessage: React.FC<Props> = ({ message, onClick }) => {
  const handleClick = useCallback(
    () => onClick(message.id!),
    [onClick, message]
  );

  return (
    <Container type={message.alertType}>
      <Text>{message.text}</Text>
      <CloseContainer onClick={handleClick}>
        <CloseButton>+</CloseButton>
      </CloseContainer>
    </Container>
  );
};

const AlertMessage = React.memo(_AlertMessage);
export default AlertMessage;
