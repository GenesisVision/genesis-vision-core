import React from "react";
import { VERTICAL_POPOVER_POS } from "shared/popover/popover";
import Tooltip from "shared/tooltip/tooltip";
import { TooltipContent } from "shared/tooltip/tooltip-content";
import styled from "styled-components";

interface Props {
  content: React.ReactNode;
  tooltipContent: React.ReactNode;
  className?: string;
  vertical: VERTICAL_POPOVER_POS;
}

const Content = styled.div`
  cursor: help;
`;

const _Hint: React.FC<Props> = ({
  content,
  tooltipContent,
  className,
  vertical
}) => {
  return (
    <div className={className}>
      <Tooltip
        vertical={vertical}
        render={() => <TooltipContent>{tooltipContent}</TooltipContent>}
      >
        <Content>{content}</Content>
      </Tooltip>
    </div>
  );
};

const Hint = React.memo(_Hint);
export default Hint;
