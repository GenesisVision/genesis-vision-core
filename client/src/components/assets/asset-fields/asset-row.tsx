import React from "react";
import { Row } from "shared/row/row";

export const AssetRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => {
  return (
    <Row center={false} wrap>
      {children}
    </Row>
  );
};

export default AssetRow;
