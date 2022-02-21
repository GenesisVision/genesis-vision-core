import { Text } from "shared/text/text";
import HelpButton from "shared/help-button/help-button";
import { TooltipLabel } from "shared/tooltip-label/tooltip-label";
import { RowItem } from "shared/row-item/row-item";

interface Props {
  label: string;
  tooltipText: string | JSX.Element;
}

export const LabeledTooltipWithQuestion: React.FC<Props> = ({
  tooltipText,
  label
}) => {
  return (
    <Text weight={"bold"}>
      <TooltipLabel
        tooltipContent={tooltipText}
        // @ts-ignore
        labelText={
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <RowItem size={"xsmall"}>{label}</RowItem>
              <HelpButton muted />
            </div>
          </>
        }
      />
    </Text>
  );
};
