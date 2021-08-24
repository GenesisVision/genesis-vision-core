import React, { useCallback } from "react";
import { Button } from "shared/button/button";
import { PopoverContentListItem } from "shared/popover/popover-content";
import styled from "styled-components";
import { $primaryColor } from "styles/colors";

interface Props {
  value: string;
  isSelected: boolean;
  name?: string;
  className?: string;
  onClick: (props: { event: SelectItemClick; isSelected: boolean }) => void;
  children: string;
}

interface SelectItemClick
  extends React.MouseEvent<HTMLButtonElement, MouseEvent> {}

export const getSelectItemSelector = (value: string) => `select-item-${value}`;

const StyledButton = styled(Button)<{ selected?: boolean }>`
  &:hover {
    opacity: 0.9;
  }
  ${({ selected }) => selected && `color: ${$primaryColor};`};
`;

const SelectItem: React.FC<Props> = React.memo(
  ({ isSelected, className, children, name, onClick, value }) => {
    const handleClick = useCallback(
      (event: SelectItemClick) => onClick({ event, isSelected }),
      [onClick, isSelected]
    );
    return (
      <StyledButton
        selected={isSelected}
        testId={getSelectItemSelector(value)}
        variant="text"
        color="secondary"
        noPadding
        className={className}
        onClick={handleClick}
        name={name}
      >
        <PopoverContentListItem>{children}</PopoverContentListItem>
      </StyledButton>
    );
  }
);

export default SelectItem;
