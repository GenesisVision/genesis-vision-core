import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useEffect, useRef } from "react";
import { GvInput } from "shared/gv-input/gv-input";
import styled from "styled-components";

import GVTextArea from "./gv-text-area";
import { GVTextFieldProps, gvTextFieldStyle } from "./gv-text-field.styles";

const _GVTextField: React.FC<GVTextFieldProps> = (props) => {
  const {
    className,
    onFocus,
    onBlur,
    autoFocus,
    type = "text",
    InputComponent = "input",
    ...otherProps
  } = props;
  const input = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [focused, setFocused, setNotFocused] = useIsOpen();

  const handleFocus = useCallback(() => {
    setFocused();
    if (onFocus) onFocus();
  }, []);

  const handleBlur = useCallback(
    (e: any) => {
      setNotFocused();
      if (onBlur) onBlur(e);
    },
    [onBlur]
  );

  useEffect(() => {
    if (autoFocus && input.current) {
      const focusInput = () => {
        input.current!.focus && input.current!.focus();
      };
      if (typeof setImmediate !== "undefined") setImmediate(focusInput);
      else focusInput();
    }
  }, [autoFocus, input.current]);

  const renderInput = () => {
    const Input: React.ComponentType<any> | string =
      type === "textarea" ? GVTextArea : InputComponent;

    return (
      <Input
        {...props}
        ref={input}
        type={type}
        className={className}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
  };

  return (
    <GvInput {...otherProps} inputElement={renderInput()} focused={focused} />
  );
};

const StyledGVTextField = styled(_GVTextField)`
  ${gvTextFieldStyle}
`;

const GVTextField = React.memo(StyledGVTextField);
export default GVTextField;
