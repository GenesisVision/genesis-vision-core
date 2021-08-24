import * as React from "react";
import { PopoverContentCardBlock } from "shared/popover/popover-card.block";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  fixed?: boolean;
}

export const DialogBottom: React.FC<Props> = ({
  fixed = true,
  className,
  children
}) => (
  <PopoverContentCardBlock size={"large"} fixed={fixed} className={className}>
    {children}
  </PopoverContentCardBlock>
);
