import React from "react";
import InitialTokensAmountField from "./initial-tokens-amount-field";
import SymbolField from "./symbol-field";
import TitleField from "./title-field";

interface Props {
  titleName: string;
  symbolName: string;
  initialTokensAmountName: string;
}

const _DescriptionBlock: React.FC<Props> = ({
  titleName,
  symbolName,
  initialTokensAmountName,
}) => {
  return (
    <div>
      <TitleField name={titleName} />
      <SymbolField name={symbolName} />
      <InitialTokensAmountField name={initialTokensAmountName} />
    </div>
  );
};

const DescriptionBlock = React.memo(_DescriptionBlock);
export default DescriptionBlock;
