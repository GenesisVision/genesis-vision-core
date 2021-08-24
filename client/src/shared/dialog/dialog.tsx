import React, { ReactNode, useCallback, useState } from "react";
import { Button } from "shared/button/button";
import { CloseIcon } from "shared/icon/close-icon";
import Modal, { BodyFix } from "shared/modal/modal";
import styled from "styled-components";
import { $secondaryBackgroundColor } from "styles/colors";
import { mediaBreakpointLandscapePhone } from "styles/media";
import { adaptiveFullPadding } from "styles/mixins";
import { $modalWidth, $paddingSmall, $paddingXxsmall } from "styles/sizes";

export interface IDialogProps extends IDialogOuterProps {
  showClose?: boolean;
  children?: ReactNode;
  className?: string;
  top?: boolean;
}

export interface IDialogOuterProps {
  open: boolean;
  onClose: (param?: any) => void;
}

const CloseButton = styled(Button)`
  position: absolute;
  width: 30px;
  z-index: 2;
  right: 10px;
  top: 15px;
  ${adaptiveFullPadding($paddingXxsmall)};
`;

const Wrapper = styled.div`
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  position: relative;
  background-color: ${$secondaryBackgroundColor};
  z-index: 1300;
  margin: ${$paddingSmall}px auto;
  overflow-x: hidden;
  overflow-y: auto;
  min-width: 100%;
  ${mediaBreakpointLandscapePhone(`
    min-width: ${$modalWidth}px;
    border-radius: 8px;
    `)}
`;

export const Dialog: React.FC<IDialogProps> = ({
  showClose = true,
  top,
  open,
  onClose,
  className,
  children
}) => {
  const [target, setTarget] = useState<EventTarget | null>(null);

  const handleBackdropClick = useCallback(
    event => {
      if (target === event.currentTarget && onClose) {
        onClose(event);
      }
    },
    [onClose, target]
  );

  const handleMouseDown = useCallback(event => {
    setTarget(event.target);
  }, []);

  return (
    <Modal open={open} fixed onClose={onClose}>
      <Wrapper onClick={handleBackdropClick} onMouseDown={handleMouseDown}>
        <BodyFix />
        <Container className={className}>
          {showClose && (
            <CloseButton variant="text" color="secondary" onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          )}
          {children}
        </Container>
      </Wrapper>
    </Modal>
  );
};

export default Dialog;
