import useInterval from "hooks/interval.hook";
import useIsWindowVisible from "hooks/window-visible.hook";

import { useSelector } from "react-redux";
import { useAppDispatch } from "state";
import { State } from "state/types";
import { simpleRpcProvider } from "utils/providers";
import { setBlock } from ".";

export const usePollBlockNumber = (refreshTime = 6000) => {
  const dispatch = useAppDispatch();
  const isWindowVisible = useIsWindowVisible();

  useInterval(
    () => {
      const fetchBlock = async () => {
        const blockNumber = await simpleRpcProvider.getBlockNumber();
        dispatch(setBlock(blockNumber));
      };

      fetchBlock();
    },
    isWindowVisible ? refreshTime : null,
    true
  );
};

export const useBlock = () => {
  return useSelector((state: State) => state.block);
};

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock);
};
