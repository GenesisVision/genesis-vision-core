import { ethers } from "ethers";

export const simpleRpcProvider = new ethers.providers.StaticJsonRpcProvider(
  process.env.REACT_APP_RPC_URL
);

export default null;
