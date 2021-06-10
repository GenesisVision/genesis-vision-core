import React from "react";
import { SubmitButton } from "shared/submit-button/submit-button";

interface Props {
  disabled?: boolean;
  isSuccessful?: boolean;
  isSubmitting?: boolean;
}

const _CreateAssetNavigation: React.FC<Props> = ({
  isSubmitting,
  disabled,
  isSuccessful,
}) => {
  return (
    <SubmitButton
      title={"Create Fund"}
      isPending={isSubmitting}
      isSuccessful={isSuccessful}
      disabled={disabled}
    >
      Create Fund
    </SubmitButton>
  );
};

const CreateAssetNavigation = React.memo(_CreateAssetNavigation);
export default CreateAssetNavigation;
