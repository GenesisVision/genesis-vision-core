import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";
import ActivePopup from "shared/active/active-popup";
import WalletImage from "shared/avatar/wallet-image/wallet-image";
import { RowItem } from "shared/row-item/row-item";
import { Row } from "shared/row/row";
import { Text } from "shared/text/text";
import styled, { css } from "styled-components";
import { $rowColor, $textLightColor } from "styles/colors";
import { fontSize, height, width } from "styles/mixins";
import { $boxShadow1 } from "styles/shadow";
import {
  $dividerTitle,
  $fontSizeParagraph,
  $fontSizeSmall,
  $walletItemSize
} from "styles/sizes";
import { CurrencyEnum } from "utils/gv-api.types";

export enum Themes {
  LIGHT = "Light",
  DARK = "Dark"
}

type ThemePropsType = { theme?: Themes };

export interface ICurrencyItemProps extends ThemePropsType {
  showTitle?: boolean;
  url?: string;
  symbol?: string | CurrencyEnum;
  big?: boolean;
  rate?: number;
  clickable?: boolean;
  small?: boolean;
  logo?: string;
  name?: string | CurrencyEnum;
  showSymbolWithName?: boolean;
}

const Icon = styled(RowItem)<{ small?: boolean }>`
  object-fit: cover;
  box-shadow: ${$boxShadow1};
  border-radius: 100%;
  & img {
    width: 100%;
    border-radius: 100%;
    height: auto;
  }
  ${({ small }) =>
    small
      ? `
    ${width($walletItemSize / $dividerTitle)};
    ${height($walletItemSize / $dividerTitle)};
  `
      : `
    ${width($walletItemSize)};
    ${height($walletItemSize)};
  `}
`;

const themeStyle = css<ThemePropsType>`
  color: ${({ theme }) => {
    switch (theme) {
      case Themes.DARK:
        return $textLightColor;
      case Themes.LIGHT:
        return $rowColor;
    }
  }};
`;

const nameStyle = css<ThemePropsType>`
  white-space: nowrap;
  letter-spacing: 0.6px;
  ${themeStyle};
`;

const Name = styled.div`
  ${nameStyle};
  ${fontSize($fontSizeParagraph)};
`;

const BigName = styled.h1`
  ${nameStyle};
  padding: 0;
`;

const Rate = styled.div<ThemePropsType>`
  ${fontSize($fontSizeSmall)};
  ${themeStyle};
`;

const CurrencyNameWithSymbol = ({
  symbol,
  name
}: {
  symbol: string;
  name: string;
}) => {
  return (
    <>
      <Row>
        <Name>{symbol}</Name>
      </Row>
      <Row size={"zero"}>
        <Text muted size={"xsmall"}>
          {name}
        </Text>
      </Row>
    </>
  );
};

const _CurrencyItem: React.FC<ICurrencyItemProps> = ({
  url,
  symbol,
  big,
  rate,
  logo,
  name,
  small,
  theme = Themes.DARK,
  clickable = true,
  showTitle = true,
  showSymbolWithName = false
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const openPopup = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      setOpenPopup();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const rateString = `1 ${name} = ${rate} $`;
  const renderItemContent = () => (
    <div data-test-id={symbol}>
      <Row>
        {logo && (
          <Icon small={small} size={small ? "small" : undefined}>
            <WalletImage url={logo} alt={name || symbol} />
          </Icon>
        )}
        {name && (
          <RowItem>
            {big ? (
              <BigName theme={theme}>{name}</BigName>
            ) : showSymbolWithName ? (
              <CurrencyNameWithSymbol symbol={symbol!} name={name} />
            ) : (
              <Name theme={theme}>{name}</Name>
            )}
            {rate && <Rate theme={theme}>{rateString}</Rate>}
          </RowItem>
        )}
      </Row>
    </div>
  );
  const active = symbol || name || "";
  return (
    (clickable && (
      <>
        {renderItemContent()}
        {/* <a
          title={showTitle ? active : ""}
          href={getActiveUrl(url || active)}
          onClick={openPopup}
        >
          {renderItemContent()}
        </a>
        <ActivePopup
          open={isOpenPopup}
          onClose={setClosePopup}
          active={active}
        /> */}
      </>
    )) ||
    renderItemContent()
  );
};

export const CurrencyItem = React.memo(_CurrencyItem);
