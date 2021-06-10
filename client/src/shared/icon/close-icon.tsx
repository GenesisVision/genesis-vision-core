import React from "react";
import { CloseIconSVGSource } from "./close-icon-svg-source";
import { Icon, IIconProps } from "./icon";

export const CloseIcon: React.FC<IIconProps> = (props) => (
  <Icon type="close" {...props}>
    <CloseIconSVGSource />
  </Icon>
);
