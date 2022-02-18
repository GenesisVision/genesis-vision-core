import { Text } from "shared/text/text";
import HelpButton from "shared/help-button/help-button";
import { TooltipLabel } from "shared/tooltip-label/tooltip-label";

interface Props {
  tooltipText: string;
  label: string;
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
            {label} <HelpButton muted />
          </>
        }
      />
    </Text>
  );
};
