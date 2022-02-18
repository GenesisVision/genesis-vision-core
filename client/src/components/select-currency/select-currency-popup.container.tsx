import { Currency, ETHER, Token } from "@pancakeswap/sdk";
import useDebounce from "hooks/debounce.hook";
import { Text } from "shared/text/text";
import { useAllTokens } from "hooks/token";
import React, { useMemo, useRef, useState } from "react";
import GVTextField from "shared/gv-text-field";
import { DialogBottom } from "shared/dialog/dialog-bottom";
import { DialogTop } from "shared/dialog/dialog-top";
import { Row } from "shared/row/row";
import CurrencyList from "./currency-list";
import {
  filterTokens,
  useSortedTokensByQuery,
  useTokenComparator
} from "./select-currency.helpers";
import { useCallback, KeyboardEvent } from "react";
import { isAddress } from "utils";
import { FixedSizeList } from "react-window";
import styled from "styled-components";

const Container = styled(Row)`
  height: 400px;
`;

const StyledText = styled(Text)`
  display: block;
  text-align: center;
`;

interface Props {
  selectedCurrency?: Currency | null;
  otherSelectedCurrency?: Currency | null;
  onCurrencySelect: (currency: Currency) => void;
}

const _SelectCurrencyPopupContainer: React.FC<Props> = ({
  selectedCurrency,
  otherSelectedCurrency,
  onCurrencySelect
}) => {
  // refs for fixed size lists
  const fixedList = useRef<FixedSizeList>();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedQuery = useDebounce(searchQuery, 200);

  const allTokens = useAllTokens();

  const showETH: boolean = useMemo(() => {
    const s = debouncedQuery.toLowerCase().trim();
    return s === "" || s === "b" || s === "bn" || s === "bnb";
  }, [debouncedQuery]);

  const tokenComparator = useTokenComparator();

  const filteredTokens: Token[] = useMemo(() => {
    return filterTokens(Object.values(allTokens), debouncedQuery);
  }, [allTokens, debouncedQuery]);

  const sortedTokens: Token[] = useMemo(() => {
    return filteredTokens.sort(tokenComparator);
  }, [filteredTokens, tokenComparator]);

  const filteredSortedTokens = useSortedTokensByQuery(
    sortedTokens,
    debouncedQuery
  );

  const handleInput = useCallback(event => {
    const input = event.target.value;
    const checksummedInput = isAddress(input);
    setSearchQuery(checksummedInput || input);
    fixedList.current?.scrollTo(0);
  }, []);

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const s = debouncedQuery.toLowerCase().trim();
        if (s === "bnb") {
          onCurrencySelect(ETHER);
        } else if (filteredSortedTokens.length > 0) {
          if (
            filteredSortedTokens[0].symbol?.toLowerCase() ===
              debouncedQuery.trim().toLowerCase() ||
            filteredSortedTokens.length === 1
          ) {
            onCurrencySelect(filteredSortedTokens[0]);
          }
        }
      }
    },
    [filteredSortedTokens, onCurrencySelect, debouncedQuery]
  );

  return (
    <>
      <DialogTop title={"Select a Token"} />
      <DialogBottom>
        <Row>
          <GVTextField
            maxLength={100}
            wide
            placeholder="Search name or paste address"
            autoComplete="off"
            value={searchQuery}
            onChange={handleInput}
            onKeyDown={handleEnter}
            autoFocus
          />
        </Row>
        <Container onlyOffset>
          {filteredSortedTokens?.length > 0 ? (
            <CurrencyList
              showETH={showETH}
              currencies={filteredSortedTokens}
              breakIndex={
                debouncedQuery.length > 0 && filteredSortedTokens
                  ? filteredSortedTokens.length
                  : undefined
              }
              onCurrencySelect={onCurrencySelect}
              otherCurrency={otherSelectedCurrency}
              selectedCurrency={selectedCurrency}
              fixedListRef={fixedList}
            />
          ) : (
            <StyledText size={"large"}>No results found.</StyledText>
          )}
        </Container>
      </DialogBottom>
    </>
  );
};

const SelectCurrencyPopupContainer = React.memo(_SelectCurrencyPopupContainer);
export default SelectCurrencyPopupContainer;
