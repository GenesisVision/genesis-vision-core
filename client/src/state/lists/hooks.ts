import DEFAULT_TOKEN_LIST from "../../config/constants/tokenLists/pancake-default.tokenlist.json";
import { ChainId, Token } from "@pancakeswap/sdk";
import { TokenList, Tags, TokenInfo } from "@uniswap/token-lists";
import {
  DEFAULT_LIST_OF_LISTS,
  UNSUPPORTED_LIST_URLS
} from "config/constants/lists";
import { useMemo } from "react";

// use ordering of default list of lists to assign priority
function sortByListPriority(urlA: string, urlB: string) {
  const first = DEFAULT_LIST_OF_LISTS.includes(urlA)
    ? DEFAULT_LIST_OF_LISTS.indexOf(urlA)
    : Number.MAX_SAFE_INTEGER;
  const second = DEFAULT_LIST_OF_LISTS.includes(urlB)
    ? DEFAULT_LIST_OF_LISTS.indexOf(urlB)
    : Number.MAX_SAFE_INTEGER;

  // need reverse order to make sure mapping includes top priority last
  if (first < second) return 1;
  if (first > second) return -1;
  return 0;
}

export type TokenAddressMap = Readonly<
  {
    [chainId in ChainId]: Readonly<{
      [tokenAddress: string]: { token: WrappedTokenInfo; list: TokenList };
    }>;
  }
>;

type TagDetails = Tags[keyof Tags];
export interface TagInfo extends TagDetails {
  id: string;
}

export class WrappedTokenInfo extends Token {
  public readonly tokenInfo: TokenInfo;

  public readonly tags: TagInfo[];

  constructor(tokenInfo: TokenInfo, tags: TagInfo[]) {
    super(
      tokenInfo.chainId,
      tokenInfo.address,
      tokenInfo.decimals,
      tokenInfo.symbol,
      tokenInfo.name
    );
    this.tokenInfo = tokenInfo;
    this.tags = tags;
  }

  public get logoURI(): string | undefined {
    return this.tokenInfo.logoURI;
  }
}

/**
 * An empty result, useful as a default.
 */
const EMPTY_LIST: TokenAddressMap = {
  [ChainId.MAINNET]: {},
  [ChainId.TESTNET]: {}
};

const listCache: WeakMap<TokenList, TokenAddressMap> | null =
  typeof WeakMap !== "undefined"
    ? new WeakMap<TokenList, TokenAddressMap>()
    : null;

export function listToTokenMap(list: TokenList): TokenAddressMap {
  const result = listCache?.get(list);
  if (result) return result;

  const map = list.tokens.reduce<TokenAddressMap>(
    (tokenMap, tokenInfo) => {
      const tags: TagInfo[] =
        tokenInfo.tags
          ?.map(tagId => {
            if (!list.tags?.[tagId]) return undefined;
            return { ...list.tags[tagId], id: tagId };
          })
          ?.filter((x): x is TagInfo => Boolean(x)) ?? [];
      const token = new WrappedTokenInfo(tokenInfo, tags);
      if (tokenMap[token.chainId][token.address] !== undefined)
        throw Error("Duplicate tokens.");
      return {
        ...tokenMap,
        [token.chainId]: {
          ...tokenMap[token.chainId],
          [token.address]: {
            token,
            list
          }
        }
      };
    },
    { ...EMPTY_LIST }
  );
  listCache?.set(list, map);
  return map;
}

export function useAllLists(): {
  readonly [url: string]: {
    readonly current: TokenList | null;
    readonly pendingUpdate: TokenList | null;
    readonly loadingRequestId: string | null;
    readonly error: string | null;
  };
} {
  return {
    "https://tokens.pancakeswap.finance/pancakeswap-top-100.json": {
      current: {
        name: "PancakeSwap Top 100",
        timestamp: "2022-01-26T18:35:22.266Z",
        version: {
          major: 2,
          minor: 16,
          patch: 10
        },
        logoURI:
          "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png",
        keywords: ["pancakeswap", "top 100"],
        tokens: [
          {
            name: "Cardano Token",
            symbol: "ADA",
            address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47.png"
          },
          {
            name: "ALICE",
            symbol: "ALICE",
            address: "0xAC51066d7bEC65Dc4589368da368b212745d63E8",
            chainId: 56,
            decimals: 6,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xAC51066d7bEC65Dc4589368da368b212745d63E8.png"
          },
          {
            name: "AlinX",
            symbol: "ALIX",
            address: "0xaF6Bd11A6F8f9c44b9D18f5FA116E403db599f8E",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xaF6Bd11A6F8f9c44b9D18f5FA116E403db599f8E/logo.png"
          },
          {
            name: "AlphaToken",
            symbol: "ALPHA",
            address: "0xa1faa113cbE53436Df28FF0aEe54275c13B40975",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xa1faa113cbE53436Df28FF0aEe54275c13B40975.png"
          },
          {
            name: "Altura",
            symbol: "ALU",
            address: "0x8263CD1601FE73C066bf49cc09841f35348e3be0",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x8263CD1601FE73C066bf49cc09841f35348e3be0/logo.png"
          },
          {
            name: "Automata",
            symbol: "ATA",
            address: "0xA2120b9e674d3fC3875f415A7DF52e382F141225",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xA2120b9e674d3fC3875f415A7DF52e382F141225.png"
          },
          {
            name: "Cosmos Token",
            symbol: "ATOM",
            address: "0x0Eb3a705fc54725037CC9e008bDede697f62F335",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x0Eb3a705fc54725037CC9e008bDede697f62F335.png"
          },
          {
            name: "Axie Infinity Shard",
            symbol: "AXS",
            address: "0x715D400F88C167884bbCc41C5FeA407ed4D2f8A0",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x715D400F88C167884bbCc41C5FeA407ed4D2f8A0.png"
          },
          {
            name: "Baby Doge Coin",
            symbol: "BABYDOGE",
            address: "0xc748673057861a797275CD8A068AbB95A902e8de",
            chainId: 56,
            decimals: 9,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xc748673057861a797275CD8A068AbB95A902e8de/logo.png"
          },
          {
            name: "Bear",
            symbol: "BEAR",
            address: "0xc3EAE9b061Aa0e1B9BD3436080Dc57D2d63FEdc1",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xc3EAE9b061Aa0e1B9BD3436080Dc57D2d63FEdc1/logo.png"
          },
          {
            name: "Bella Protocol",
            symbol: "BEL",
            address: "0x8443f091997f06a61670B735ED92734F5628692F",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x8443f091997f06a61670B735ED92734F5628692F.png"
          },
          {
            name: "BELT Token",
            symbol: "BELT",
            address: "0xE0e514c71282b6f4e823703a39374Cf58dc3eA4f",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xE0e514c71282b6f4e823703a39374Cf58dc3eA4f.png"
          },
          {
            name: "Binemon",
            symbol: "BIN",
            address: "0xe56842Ed550Ff2794F010738554db45E60730371",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xe56842Ed550Ff2794F010738554db45E60730371/logo.png"
          },
          {
            name: "Binamon",
            symbol: "BMON",
            address: "0x08ba0619b1e7A582E0BCe5BBE9843322C954C340",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x08ba0619b1e7A582E0BCe5BBE9843322C954C340.png"
          },
          {
            name: "BinaryX",
            symbol: "BNX",
            address: "0x8C851d1a123Ff703BD1f9dabe631b69902Df5f97",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x8C851d1a123Ff703BD1f9dabe631b69902Df5f97/logo.png"
          },
          {
            name: "BunnyPark",
            symbol: "BP",
            address: "0xACB8f52DC63BB752a51186D1c55868ADbFfEe9C1",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xACB8f52DC63BB752a51186D1c55868ADbFfEe9C1.png"
          },
          {
            name: "BSCPAD.com",
            symbol: "BSCPAD",
            address: "0x5A3010d4d8D3B5fB49f8B6E57FB9E48063f16700",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5A3010d4d8D3B5fB49f8B6E57FB9E48063f16700.png"
          },
          {
            name: "BitTorrent",
            symbol: "BTT",
            address: "0x8595F9dA7b868b1822194fAEd312235E43007b49",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x8595F9dA7b868b1822194fAEd312235E43007b49.png"
          },
          {
            name: "Coin98",
            symbol: "C98",
            address: "0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6.png"
          },
          {
            name: "Chess",
            symbol: "CHESS",
            address: "0x20de22029ab63cf9A7Cf5fEB2b737Ca1eE4c82A6",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x20de22029ab63cf9A7Cf5fEB2b737Ca1eE4c82A6.png"
          },
          {
            name: "Chroma",
            symbol: "CHR",
            address: "0xf9CeC8d50f6c8ad3Fb6dcCEC577e05aA32B224FE",
            chainId: 56,
            decimals: 6,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xf9CeC8d50f6c8ad3Fb6dcCEC577e05aA32B224FE.png"
          },
          {
            name: "CP",
            symbol: "CP",
            address: "0x82C19905B036bf4E329740989DCF6aE441AE26c1",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x82C19905B036bf4E329740989DCF6aE441AE26c1/logo.png"
          },
          {
            name: "DeRace Token",
            symbol: "DERC",
            address: "0x373E768f79c820aA441540d254dCA6d045c6d25b",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x373E768f79c820aA441540d254dCA6d045c6d25b/logo.png"
          },
          {
            name: "DODO bird",
            symbol: "DODO",
            address: "0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2.png"
          },
          {
            name: "Dogecoin",
            symbol: "DOGE",
            address: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xbA2aE424d960c26247Dd6c32edC70B295c744C43.png"
          },
          {
            name: "My DeFi Pet Token",
            symbol: "DPET",
            address: "0xfb62AE373acA027177D1c18Ee0862817f9080d08",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xfb62AE373acA027177D1c18Ee0862817f9080d08/logo.png"
          },
          {
            name: "DeathRoad Token",
            symbol: "DRACE",
            address: "0xA6c897CaaCA3Db7fD6e2D2cE1a00744f40aB87Bb",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xA6c897CaaCA3Db7fD6e2D2cE1a00744f40aB87Bb/logo.png"
          },
          {
            name: "DragonSlayer",
            symbol: "DRS",
            address: "0xc8E8ecB2A5B5d1eCFf007BF74d15A86434aA0c5C",
            chainId: 56,
            decimals: 9,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xc8E8ecB2A5B5d1eCFf007BF74d15A86434aA0c5C/logo.png"
          },
          {
            name: "Dvision",
            symbol: "DVI",
            address: "0x758FB037A375F17c7e195CC634D77dA4F554255B",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x758FB037A375F17c7e195CC634D77dA4F554255B.png"
          },
          {
            name: "Etherconnect Coin",
            symbol: "ECC",
            address: "0x8D047F4F57A190C96c8b9704B39A1379E999D82B",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x8D047F4F57A190C96c8b9704B39A1379E999D82B/logo.png"
          },
          {
            name: "Ellipsis",
            symbol: "EPS",
            address: "0xA7f552078dcC247C2684336020c03648500C6d9F",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xA7f552078dcC247C2684336020c03648500C6d9F.png"
          },
          {
            name: "FaraCrystal",
            symbol: "FARA",
            address: "0xF4Ed363144981D3A65f42e7D0DC54FF9EEf559A1",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xF4Ed363144981D3A65f42e7D0DC54FF9EEf559A1/logo.png"
          },
          {
            name: "FLOKI",
            symbol: "FLOKI",
            address: "0x2B3F34e9D4b127797CE6244Ea341a83733ddd6E4",
            chainId: 56,
            decimals: 9,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x2B3F34e9D4b127797CE6244Ea341a83733ddd6E4/logo.png"
          },
          {
            name: "Formation Finance",
            symbol: "FORM",
            address: "0x25A528af62e56512A19ce8c3cAB427807c28CC19",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x25A528af62e56512A19ce8c3cAB427807c28CC19.png"
          },
          {
            name: "Frontier Token",
            symbol: "FRONT",
            address: "0x928e55daB735aa8260AF3cEDadA18B5f70C72f1b",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x928e55daB735aa8260AF3cEDadA18B5f70C72f1b.png"
          },
          {
            name: "CyberDragon Gold",
            symbol: "GOLD",
            address: "0xb3a6381070B1a15169DEA646166EC0699fDAeA79",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xb3a6381070B1a15169DEA646166EC0699fDAeA79/logo.png"
          },
          {
            name: "StepHero",
            symbol: "HERO",
            address: "0xE8176d414560cFE1Bf82Fd73B986823B89E4F545",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xE8176d414560cFE1Bf82Fd73B986823B89E4F545.png"
          },
          {
            name: "Metahero",
            symbol: "HERO",
            address: "0xD40bEDb44C081D2935eebA6eF5a3c8A31A1bBE13",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xD40bEDb44C081D2935eebA6eF5a3c8A31A1bBE13.png"
          },
          {
            name: "Honey token",
            symbol: "HONEY",
            address: "0xFa363022816aBf82f18a9C2809dCd2BB393F6AC5",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xFa363022816aBf82f18a9C2809dCd2BB393F6AC5/logo.png"
          },
          {
            name: "Hunny Token",
            symbol: "HUNNY",
            address: "0x565b72163f17849832A692A3c5928cc502f46D69",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x565b72163f17849832A692A3c5928cc502f46D69/logo.png"
          },
          {
            name: "Injective Protocol",
            symbol: "INJ",
            address: "0xa2B726B1145A4773F68593CF171187d8EBe4d495",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xa2B726B1145A4773F68593CF171187d8EBe4d495.png"
          },
          {
            name: "IoTeX Network",
            symbol: "IOTX",
            address: "0x9678E42ceBEb63F23197D726B29b1CB20d0064E5",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x9678E42ceBEb63F23197D726B29b1CB20d0064E5.png"
          },
          {
            name: "Kaby Arena",
            symbol: "KABY",
            address: "0x02A40C048eE2607B5f5606e445CFc3633Fb20b58",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x02A40C048eE2607B5f5606e445CFc3633Fb20b58/logo.png"
          },
          {
            name: "KmonCoin",
            symbol: "KMON",
            address: "0xc732B6586A93b6B7CF5FeD3470808Bc74998224D",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xc732B6586A93b6B7CF5FeD3470808Bc74998224D/logo.png"
          },
          {
            name: "Linear Token",
            symbol: "LINA",
            address: "0x762539b45A1dCcE3D36d080F74d1AED37844b878",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x762539b45A1dCcE3D36d080F74d1AED37844b878.png"
          },
          {
            name: "ChainLink Token",
            symbol: "LINK",
            address: "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD.png"
          },
          {
            name: "Mask Network",
            symbol: "MASK",
            address: "0x2eD9a5C8C13b93955103B9a7C167B67Ef4d568a3",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x2eD9a5C8C13b93955103B9a7C167B67Ef4d568a3.png"
          },
          {
            name: "Mobox",
            symbol: "MBOX",
            address: "0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377.png"
          },
          {
            name: "MiniFootball",
            symbol: "MINIFOOTBALL",
            address: "0xD024Ac1195762F6F13f8CfDF3cdd2c97b33B248b",
            chainId: 56,
            decimals: 9,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xD024Ac1195762F6F13f8CfDF3cdd2c97b33B248b/logo.png"
          },
          {
            name: "Mist",
            symbol: "MIST",
            address: "0x68E374F856bF25468D365E539b700b648Bf94B67",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x68E374F856bF25468D365E539b700b648Bf94B67/logo.png"
          },
          {
            name: "Mound Token",
            symbol: "MND",
            address: "0x4c97c901B5147F8C1C7Ce3c5cF3eB83B44F244fE",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x4c97c901B5147F8C1C7Ce3c5cF3eB83B44F244fE/logo.png"
          },
          {
            name: "Monsta Infinite Token",
            symbol: "MONI",
            address: "0x9573c88aE3e37508f87649f87c4dd5373C9F31e0",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x9573c88aE3e37508f87649f87c4dd5373C9F31e0/logo.png"
          },
          {
            name: "Nafter",
            symbol: "NAFT",
            address: "0xD7730681B1DC8f6F969166B29D8A5EA8568616a3",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xD7730681B1DC8f6F969166B29D8A5EA8568616a3/logo.png"
          },
          {
            name: "Nobility",
            symbol: "NBL",
            address: "0xA67a13c9283Da5AABB199Da54a9Cb4cD8B9b16bA",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xA67a13c9283Da5AABB199Da54a9Cb4cD8B9b16bA/logo.png"
          },
          {
            name: "NFTB",
            symbol: "NFTB",
            address: "0xde3dbBE30cfa9F437b293294d1fD64B26045C71A",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xde3dbBE30cfa9F437b293294d1fD64B26045C71A/logo.png"
          },
          {
            name: "Nerve",
            symbol: "NRV",
            address: "0x42F6f551ae042cBe50C739158b4f0CAC0Edb9096",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x42F6f551ae042cBe50C739158b4f0CAC0Edb9096.png"
          },
          {
            name: "Harmony ONE",
            symbol: "ONE",
            address: "0x03fF0ff224f904be3118461335064bB48Df47938",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x03fF0ff224f904be3118461335064bB48Df47938.png"
          },
          {
            name: "PAID Network",
            symbol: "PAID",
            address: "0xAD86d0E9764ba90DDD68747D64BFfBd79879a238",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xAD86d0E9764ba90DDD68747D64BFfBd79879a238/logo.png"
          },
          {
            name: "PET GAMES",
            symbol: "PETG",
            address: "0x09607078980CbB0665ABa9c6D1B84b8eAD246aA0",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x09607078980CbB0665ABa9c6D1B84b8eAD246aA0/logo.png"
          },
          {
            name: "Pink Token",
            symbol: "PINK",
            address: "0x9133049Fb1FdDC110c92BF5b7Df635abB70C89DC",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x9133049Fb1FdDC110c92BF5b7Df635abB70C89DC/logo.png"
          },
          {
            name: "Polkamon",
            symbol: "PMON",
            address: "0x1796ae0b0fa4862485106a0de9b654eFE301D0b2",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x1796ae0b0fa4862485106a0de9b654eFE301D0b2.png"
          },
          {
            name: "Poco Token",
            symbol: "POCO",
            address: "0x394bBA8F309f3462b31238B3fd04b83F71A98848",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x394bBA8F309f3462b31238B3fd04b83F71A98848/logo.png"
          },
          {
            name: "Moonpot",
            symbol: "POTS",
            address: "0x3Fcca8648651E5b974DD6d3e50F61567779772A8",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x3Fcca8648651E5b974DD6d3e50F61567779772A8.png"
          },
          {
            name: "Plant vs Undead Token",
            symbol: "PVU",
            address: "0x31471E0791fCdbE82fbF4C44943255e923F1b794",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x31471E0791fCdbE82fbF4C44943255e923F1b794/logo.png"
          },
          {
            name: "PandaInu Wallet Token",
            symbol: "PWT",
            address: "0xf3eDD4f14a018df4b6f02Bf1b2cF17A8120519A2",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xf3eDD4f14a018df4b6f02Bf1b2cF17A8120519A2/logo.png"
          },
          {
            name: "Qubit Token",
            symbol: "QBT",
            address: "0x17B7163cf1Dbd286E262ddc68b553D899B93f526",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x17B7163cf1Dbd286E262ddc68b553D899B93f526.png"
          },
          {
            name: "Radio Caca V2",
            symbol: "RACA",
            address: "0x12BB890508c125661E03b09EC06E404bc9289040",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x12BB890508c125661E03b09EC06E404bc9289040/logo.png"
          },
          {
            name: "RAMP DEFI",
            symbol: "RAMP",
            address: "0x8519EA49c997f50cefFa444d240fB655e89248Aa",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x8519EA49c997f50cefFa444d240fB655e89248Aa.png"
          },
          {
            name: "Reef.finance",
            symbol: "REEF",
            address: "0xF21768cCBC73Ea5B6fd3C687208a7c2def2d966e",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xF21768cCBC73Ea5B6fd3C687208a7c2def2d966e.png"
          },
          {
            name: "rUSD",
            symbol: "RUSD",
            address: "0x07663837218A003e66310a01596af4bf4e44623D",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x07663837218A003e66310a01596af4bf4e44623D.png"
          },
          {
            name: "SafePal Token",
            symbol: "SFP",
            address: "0xD41FDb03Ba84762dD66a0af1a6C8540FF1ba5dfb",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xD41FDb03Ba84762dD66a0af1a6C8540FF1ba5dfb.png"
          },
          {
            name: "SeedifyFund",
            symbol: "SFUND",
            address: "0x477bC8d23c634C154061869478bce96BE6045D12",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x477bC8d23c634C154061869478bce96BE6045D12.png"
          },
          {
            name: "Shirtum",
            symbol: "SHI",
            address: "0x7269d98Af4aA705e0B1A5D8512FadB4d45817d5a",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x7269d98Af4aA705e0B1A5D8512FadB4d45817d5a/logo.png"
          },
          {
            name: "CryptoBlades Skill Token",
            symbol: "SKILL",
            address: "0x154A9F9cbd3449AD22FDaE23044319D6eF2a1Fab",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x154A9F9cbd3449AD22FDaE23044319D6eF2a1Fab.png"
          },
          {
            name: "StarMon",
            symbol: "SMON",
            address: "0xAB15B79880f11cFfb58dB25eC2bc39d28c4d80d2",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xAB15B79880f11cFfb58dB25eC2bc39d28c4d80d2/logo.png"
          },
          {
            name: "Splintershards",
            symbol: "SPS",
            address: "0x1633b7157e7638C4d6593436111Bf125Ee74703F",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x1633b7157e7638C4d6593436111Bf125Ee74703F.png"
          },
          {
            name: "SushiToken",
            symbol: "SUSHI",
            address: "0x947950BcC74888a40Ffa2593C5798F11Fc9124C4",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x947950BcC74888a40Ffa2593C5798F11Fc9124C4.png"
          },
          {
            name: "Swipe",
            symbol: "SXP",
            address: "0x47BEAd2563dCBf3bF2c9407fEa4dC236fAbA485A",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x47BEAd2563dCBf3bF2c9407fEa4dC236fAbA485A.png"
          },
          {
            name: "Tokocrypto Token",
            symbol: "TKO",
            address: "0x9f589e3eabe42ebC94A44727b3f3531C0c877809",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x9f589e3eabe42ebC94A44727b3f3531C0c877809.png"
          },
          {
            name: "Alien Worlds Trilium",
            symbol: "TLM",
            address: "0x2222227E22102Fe3322098e4CBfE18cFebD57c95",
            chainId: 56,
            decimals: 4,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x2222227E22102Fe3322098e4CBfE18cFebD57c95.png"
          },
          {
            name: "TokenPocket Token",
            symbol: "TPT",
            address: "0xECa41281c24451168a37211F0bc2b8645AF45092",
            chainId: 56,
            decimals: 4,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xECa41281c24451168a37211F0bc2b8645AF45092.png"
          },
          {
            name: "TRONPAD.network",
            symbol: "TRONPAD",
            address: "0x1Bf7AedeC439D6BFE38f8f9b20CF3dc99e3571C4",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x1Bf7AedeC439D6BFE38f8f9b20CF3dc99e3571C4/logo.png"
          },
          {
            name: "TRON",
            symbol: "TRX",
            address: "0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B.png"
          },
          {
            name: "TrusterCoin",
            symbol: "TSC",
            address: "0xA2a26349448ddAfAe34949a6Cc2cEcF78c0497aC",
            chainId: 56,
            decimals: 9,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xA2a26349448ddAfAe34949a6Cc2cEcF78c0497aC/logo.png"
          },
          {
            name: "TrueUSD",
            symbol: "TUSD",
            address: "0x14016E85a25aeb13065688cAFB43044C2ef86784",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x14016E85a25aeb13065688cAFB43044C2ef86784.png"
          },
          {
            name: "Trust Wallet",
            symbol: "TWT",
            address: "0x4B0F1812e5Df2A09796481Ff14017e6005508003",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x4B0F1812e5Df2A09796481Ff14017e6005508003.png"
          },
          {
            name: "UNCL on xDai on BSC",
            symbol: "UNCL",
            address: "0x0E8D5504bF54D9E44260f8d153EcD5412130CaBb",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x0E8D5504bF54D9E44260f8d153EcD5412130CaBb/logo.png"
          },
          {
            name: "UniCrypt on xDai on BSC",
            symbol: "UNCX",
            address: "0x09a6c44c3947B69E2B45F4D51b67E6a39ACfB506",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x09a6c44c3947B69E2B45F4D51b67E6a39ACfB506/logo.png"
          },
          {
            name: "Uniswap",
            symbol: "UNI",
            address: "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xBf5140A22578168FD562DCcF235E5D43A02ce9B1.png"
          },
          {
            name: "Wrapped UST Token",
            symbol: "UST",
            address: "0x23396cF899Ca06c4472205fC903bDB4de249D6fC",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x23396cF899Ca06c4472205fC903bDB4de249D6fC.png"
          },
          {
            name: "VAI Stablecoin",
            symbol: "VAI",
            address: "0x4BD17003473389A42DAF6a0a729f6Fdb328BbBd7",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x4BD17003473389A42DAF6a0a729f6Fdb328BbBd7.png"
          },
          {
            name: "Wanaka Farm",
            symbol: "WANA",
            address: "0x339C72829AB7DD45C3C52f965E7ABe358dd8761E",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x339C72829AB7DD45C3C52f965E7ABe358dd8761E/logo.png"
          },
          {
            name: "WEYU",
            symbol: "WEYU",
            address: "0xFAfD4CB703B25CB22f43D017e7e0d75FEBc26743",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xFAfD4CB703B25CB22f43D017e7e0d75FEBc26743/logo.png"
          },
          {
            name: "WINk",
            symbol: "WIN",
            address: "0xaeF0d72a118ce24feE3cD1d43d383897D05B4e99",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xaeF0d72a118ce24feE3cD1d43d383897D05B4e99.png"
          },
          {
            name: "XRP Token",
            symbol: "XRP",
            address: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE.png"
          },
          {
            name: "XWG",
            symbol: "XWG",
            address: "0x6b23C89196DeB721e6Fd9726E6C76E4810a464bc",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x6b23C89196DeB721e6Fd9726E6C76E4810a464bc/logo.png"
          },
          {
            name: "YAY Games",
            symbol: "YAY",
            address: "0x524dF384BFFB18C0C8f3f43d012011F8F9795579",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x524dF384BFFB18C0C8f3f43d012011F8F9795579/logo.png"
          },
          {
            name: "ZomaInfinity",
            symbol: "ZIN",
            address: "0xFbe0b4aE6E5a200c36A341299604D5f71A5F0a48",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0xFbe0b4aE6E5a200c36A341299604D5f71A5F0a48/logo.png"
          }
        ]
      },
      pendingUpdate: null,
      error: null,
      loadingRequestId: "OvtmaSrrtDU8zROV9RM9P"
    },
    "https://tokens.pancakeswap.finance/pancakeswap-extended.json": {
      current: {
        name: "PancakeSwap Extended",
        timestamp: "2022-02-07T09:06:20.843Z",
        version: {
          major: 2,
          minor: 16,
          patch: 68
        },
        logoURI:
          "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png",
        keywords: ["pancakeswap", "extended"],
        tokens: [
          {
            name: "PancakeSwap Token",
            symbol: "CAKE",
            address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.png"
          },
          {
            name: "8PAY Network",
            symbol: "8PAY",
            address: "0xFeea0bDd3D07eb6FE305938878C0caDBFa169042",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xFeea0bDd3D07eb6FE305938878C0caDBFa169042.png"
          },
          {
            name: "Cardano Token",
            symbol: "ADA",
            address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47.png"
          },
          {
            name: "AdEx Network",
            symbol: "ADX",
            address: "0x6bfF4Fb161347ad7de4A625AE5aa3A1CA7077819",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x6bfF4Fb161347ad7de4A625AE5aa3A1CA7077819.png"
          },
          {
            name: "My Neigbor Alice",
            symbol: "ALICE",
            address: "0xAC51066d7bEC65Dc4589368da368b212745d63E8",
            chainId: 56,
            decimals: 6,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xAC51066d7bEC65Dc4589368da368b212745d63E8.png"
          },
          {
            name: "AlpaToken",
            symbol: "ALPA",
            address: "0xc5E6689C9c8B02be7C49912Ef19e79cF24977f03",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xc5E6689C9c8B02be7C49912Ef19e79cF24977f03.png"
          },
          {
            name: "Alpaca",
            symbol: "ALPACA",
            address: "0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F.png"
          },
          {
            name: "AlphaToken",
            symbol: "ALPHA",
            address: "0xa1faa113cbE53436Df28FF0aEe54275c13B40975",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xa1faa113cbE53436Df28FF0aEe54275c13B40975.png"
          },
          {
            name: "Ampleforth",
            symbol: "AMPL",
            address: "0xDB021b1B247fe2F1fa57e0A87C748Cc1E321F07F",
            chainId: 56,
            decimals: 9,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xDB021b1B247fe2F1fa57e0A87C748Cc1E321F07F.png"
          },
          {
            name: "Ankr",
            symbol: "ANKR",
            address: "0xf307910A4c7bbc79691fD374889b36d8531B08e3",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xf307910A4c7bbc79691fD374889b36d8531B08e3.png"
          },
          {
            name: "Antex",
            symbol: "ANTEX",
            address: "0xCA1aCAB14e85F30996aC83c64fF93Ded7586977C",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xCA1aCAB14e85F30996aC83c64fF93Ded7586977C.png"
          },
          {
            name: "anyMTLX",
            symbol: "anyMTLX",
            address: "0x5921DEE8556c4593EeFCFad3CA5e2f618606483b",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5921DEE8556c4593EeFCFad3CA5e2f618606483b.png"
          },
          {
            name: "AgeOfGods",
            symbol: "AOG",
            address: "0x40C8225329Bd3e28A043B029E0D07a5344d2C27C",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x40C8225329Bd3e28A043B029E0D07a5344d2C27C.png"
          },
          {
            name: "ApolloX Token",
            symbol: "APX",
            address: "0x78F5d389F5CDCcFc41594aBaB4B0Ed02F31398b3",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x78F5d389F5CDCcFc41594aBaB4B0Ed02F31398b3.png"
          },
          {
            name: "APYSwap",
            symbol: "APYS",
            address: "0x37dfACfaeDA801437Ff648A1559d73f4C40aAcb7",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x37dfACfaeDA801437Ff648A1559d73f4C40aAcb7.png"
          },
          {
            name: "ARPA",
            symbol: "ARPA",
            address: "0x6F769E65c14Ebd1f68817F5f1DcDb61Cfa2D6f7e",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x6F769E65c14Ebd1f68817F5f1DcDb61Cfa2D6f7e.png"
          },
          {
            name: "ARIVA",
            symbol: "ARV",
            address: "0x6679eB24F59dFe111864AEc72B443d1Da666B360",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x6679eB24F59dFe111864AEc72B443d1Da666B360.png"
          },
          {
            name: "AS Roma",
            symbol: "ASR",
            address: "0x80D5f92C2c8C682070C95495313dDB680B267320",
            chainId: 56,
            decimals: 2,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x80D5f92C2c8C682070C95495313dDB680B267320.png"
          },
          {
            name: "Automata",
            symbol: "ATA",
            address: "0xA2120b9e674d3fC3875f415A7DF52e382F141225",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xA2120b9e674d3fC3875f415A7DF52e382F141225.png"
          },
          {
            name: "Atletico de Madrid",
            symbol: "ATM",
            address: "0x25E9d05365c867E59C1904E7463Af9F312296f9E",
            chainId: 56,
            decimals: 2,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x25E9d05365c867E59C1904E7463Af9F312296f9E.png"
          },
          {
            name: "Cosmos Token",
            symbol: "ATOM",
            address: "0x0Eb3a705fc54725037CC9e008bDede697f62F335",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x0Eb3a705fc54725037CC9e008bDede697f62F335.png"
          },
          {
            name: "AUTOv2",
            symbol: "AUTO",
            address: "0xa184088a740c695E156F91f5cC086a06bb78b827",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xa184088a740c695E156F91f5cC086a06bb78b827.png"
          },
          {
            name: "Axie Infinity Shard",
            symbol: "AXS",
            address: "0x715D400F88C167884bbCc41C5FeA407ed4D2f8A0",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x715D400F88C167884bbCc41C5FeA407ed4D2f8A0.png"
          },
          {
            name: "BabyCake",
            symbol: "BABYCAKE",
            address: "0xdB8D30b74bf098aF214e862C90E647bbB1fcC58c",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xdB8D30b74bf098aF214e862C90E647bbB1fcC58c.png"
          },
          {
            name: "Bakery Token",
            symbol: "BAKE",
            address: "0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5.png"
          },
          {
            name: "AllianceBlock",
            symbol: "bALBT",
            address: "0x72fAa679E1008Ad8382959FF48E392042A8b06f7",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x72fAa679E1008Ad8382959FF48E392042A8b06f7.png"
          },
          {
            name: "BAND Protocol Token",
            symbol: "BAND",
            address: "0xAD6cAEb32CD2c308980a548bD0Bc5AA4306c6c18",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xAD6cAEb32CD2c308980a548bD0Bc5AA4306c6c18.png"
          },
          {
            name: "Basic Attention Token",
            symbol: "BAT",
            address: "0x101d82428437127bF1608F699CD651e6Abf9766E",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x101d82428437127bF1608F699CD651e6Abf9766E.png"
          },
          {
            name: "Battle Hero",
            symbol: "BATH",
            address: "0x0bc89aa98Ad94E6798Ec822d0814d934cCD0c0cE",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x0bc89aa98Ad94E6798Ec822d0814d934cCD0c0cE.png"
          },
          {
            name: "bBADGER",
            symbol: "bBADGER",
            address: "0x1F7216fdB338247512Ec99715587bb97BBf96eae",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x1F7216fdB338247512Ec99715587bb97BBf96eae.png"
          },
          {
            name: "BitBook",
            symbol: "BBT",
            address: "0xD48474E7444727bF500a32D5AbE01943f3A59A64",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xD48474E7444727bF500a32D5AbE01943f3A59A64.png"
          },
          {
            name: "Conflux",
            symbol: "bCFX",
            address: "0x045c4324039dA91c52C55DF5D785385Aab073DcF",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x045c4324039dA91c52C55DF5D785385Aab073DcF.png"
          },
          {
            name: "Bitcoin Cash Token",
            symbol: "BCH",
            address: "0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf.png"
          },
          {
            name: "Bomb Crypto",
            symbol: "BCOIN",
            address: "0x00e1656e45f18ec6747F5a8496Fd39B50b38396D",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x00e1656e45f18ec6747F5a8496Fd39B50b38396D.png"
          },
          {
            name: "bDIGG",
            symbol: "bDIGG",
            address: "0x5986D5c77c65e5801a5cAa4fAE80089f870A71dA",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5986D5c77c65e5801a5cAa4fAE80089f870A71dA.png"
          },
          {
            name: "bDollar",
            symbol: "BDO",
            address: "0x190b589cf9Fb8DDEabBFeae36a813FFb2A702454",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x190b589cf9Fb8DDEabBFeae36a813FFb2A702454.png"
          },
          {
            name: "Bella Protocol",
            symbol: "BEL",
            address: "0x8443f091997f06a61670B735ED92734F5628692F",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x8443f091997f06a61670B735ED92734F5628692F.png"
          },
          {
            name: "Belt",
            symbol: "BELT",
            address: "0xE0e514c71282b6f4e823703a39374Cf58dc3eA4f",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xE0e514c71282b6f4e823703a39374Cf58dc3eA4f.png"
          },
          {
            name: "Beta Finance",
            symbol: "BETA",
            address: "0xBe1a001FE942f96Eea22bA08783140B9Dcc09D28",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xBe1a001FE942f96Eea22bA08783140B9Dcc09D28.png"
          },
          {
            name: "Beacon ETH",
            symbol: "BETH",
            address: "0x250632378E573c6Be1AC2f97Fcdf00515d0Aa91B",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x250632378E573c6Be1AC2f97Fcdf00515d0Aa91B.png"
          },
          {
            name: "b.earnfi",
            symbol: "BFI",
            address: "0x81859801b01764D4f0Fa5E64729f5a6C3b91435b",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x81859801b01764D4f0Fa5E64729f5a6C3b91435b.png"
          },
          {
            name: "Beefy.finance",
            symbol: "BIFI",
            address: "0xCa3F508B8e4Dd382eE878A314789373D80A5190A",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xCa3F508B8e4Dd382eE878A314789373D80A5190A.png"
          },
          {
            name: "BLINk",
            symbol: "BLK",
            address: "0x63870A18B6e42b01Ef1Ad8A2302ef50B7132054F",
            chainId: 56,
            decimals: 6,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x63870A18B6e42b01Ef1Ad8A2302ef50B7132054F.png"
          },
          {
            name: "Binamon",
            symbol: "BMON",
            address: "0x08ba0619b1e7A582E0BCe5BBE9843322C954C340",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x08ba0619b1e7A582E0BCe5BBE9843322C954C340.png"
          },
          {
            name: "Multiplier",
            symbol: "bMXX",
            address: "0x4131b87F74415190425ccD873048C708F8005823",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x4131b87F74415190425ccD873048C708F8005823.png"
          },
          {
            name: "Bondly",
            symbol: "BONDLY",
            address: "0x5D0158A5c3ddF47d4Ea4517d8DB0D76aA2e87563",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5D0158A5c3ddF47d4Ea4517d8DB0D76aA2e87563.png"
          },
          {
            name: "OPEN Governance Token",
            symbol: "bOPEN",
            address: "0xF35262a9d427F96d2437379eF090db986eaE5d42",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xF35262a9d427F96d2437379eF090db986eaE5d42.png"
          },
          {
            name: "BoringDAO",
            symbol: "BORING",
            address: "0xffEecbf8D7267757c2dc3d13D730E97E15BfdF7F",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xffEecbf8D7267757c2dc3d13D730E97E15BfdF7F.png"
          },
          {
            name: "BunnyPark",
            symbol: "BP",
            address: "0xACB8f52DC63BB752a51186D1c55868ADbFfEe9C1",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xACB8f52DC63BB752a51186D1c55868ADbFfEe9C1.png"
          },
          {
            name: "ROOBEE",
            symbol: "bROOBEE",
            address: "0xE64F5Cb844946C1F102Bd25bBD87a5aB4aE89Fbe",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xE64F5Cb844946C1F102Bd25bBD87a5aB4aE89Fbe.png"
          },
          {
            name: "Berry",
            symbol: "BRY",
            address: "0xf859Bf77cBe8699013d6Dbc7C2b926Aaf307F830",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xf859Bf77cBe8699013d6Dbc7C2b926Aaf307F830.png"
          },
          {
            name: "BSC Ecosystem Defi blue chips",
            symbol: "BSCDEFI",
            address: "0x40E46dE174dfB776BB89E04dF1C47d8a66855EB3",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x40E46dE174dfB776BB89E04dF1C47d8a66855EB3.png"
          },
          {
            name: "BSCPad",
            symbol: "BSCPAD",
            address: "0x5A3010d4d8D3B5fB49f8B6E57FB9E48063f16700",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5A3010d4d8D3B5fB49f8B6E57FB9E48063f16700.png"
          },
          {
            name: "BSCEX",
            symbol: "BSCX",
            address: "0x5Ac52EE5b2a633895292Ff6d8A89bB9190451587",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5Ac52EE5b2a633895292Ff6d8A89bB9190451587.png"
          },
          {
            name: "Binance Pegged Bitcoin",
            symbol: "BTCB",
            address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c.png"
          },
          {
            name: "Standard BTC Hashrate Token",
            symbol: "BTCST",
            address: "0x78650B139471520656b9E7aA7A5e9276814a38e9",
            chainId: 56,
            decimals: 17,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x78650B139471520656b9E7aA7A5e9276814a38e9.png"
          },
          {
            name: "Bittrue",
            symbol: "BTR",
            address: "0x5a16E8cE8cA316407c6E6307095dc9540a8D62B3",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5a16E8cE8cA316407c6E6307095dc9540a8D62B3.png"
          },
          {
            name: "Bittorrent Old",
            symbol: "BTTOLD",
            address: "0x8595F9dA7b868b1822194fAEd312235E43007b49",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x8595F9dA7b868b1822194fAEd312235E43007b49.png"
          },
          {
            name: "Bittorrent",
            symbol: "BTT",
            address: "0x352Cb5E19b12FC216548a2677bD0fce83BaE434B",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x352Cb5E19b12FC216548a2677bD0fce83BaE434B.png"
          },
          {
            name: "Bunny Token",
            symbol: "BUNNY",
            address: "0xC9849E6fdB743d08fAeE3E34dd2D1bc69EA11a51",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xC9849E6fdB743d08fAeE3E34dd2D1bc69EA11a51.png"
          },
          {
            name: "Burger Swap",
            symbol: "BURGER",
            address: "0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f.png"
          },
          {
            name: "Binance Pegged BUSD",
            symbol: "BUSD",
            address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56.png"
          },
          {
            name: "BUX",
            symbol: "BUX",
            address: "0x211FfbE424b90e25a15531ca322adF1559779E45",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x211FfbE424b90e25a15531ca322adF1559779E45.png"
          },
          {
            name: "Coin98",
            symbol: "C98",
            address: "0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6.png"
          },
          {
            name: "CanYaCoin",
            symbol: "CAN",
            address: "0x007EA5C0Ea75a8DF45D288a4debdD5bb633F9e56",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x007EA5C0Ea75a8DF45D288a4debdD5bb633F9e56.png"
          },
          {
            name: "CryptoArt.ai",
            symbol: "CART",
            address: "0x5C8C8D560048F34E5f7f8ad71f2f81a89DBd273e",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5C8C8D560048F34E5f7f8ad71f2f81a89DBd273e.png"
          },
          {
            name: "ChainGuardians",
            symbol: "CGG",
            address: "0x1613957159E9B0ac6c80e824F7Eea748a32a0AE2",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x1613957159E9B0ac6c80e824F7Eea748a32a0AE2.png"
          },
          {
            name: "Tranchess",
            symbol: "CHESS",
            address: "0x20de22029ab63cf9A7Cf5fEB2b737Ca1eE4c82A6",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x20de22029ab63cf9A7Cf5fEB2b737Ca1eE4c82A6.png"
          },
          {
            name: "Chromia",
            symbol: "CHR",
            address: "0xf9CeC8d50f6c8ad3Fb6dcCEC577e05aA32B224FE",
            chainId: 56,
            decimals: 6,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xf9CeC8d50f6c8ad3Fb6dcCEC577e05aA32B224FE.png"
          },
          {
            name: "Compound Finance",
            symbol: "COMP",
            address: "0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8.png"
          },
          {
            name: "Contentos",
            symbol: "COS",
            address: "0x96Dd399F9c3AFda1F194182F71600F1B65946501",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x96Dd399F9c3AFda1F194182F71600F1B65946501.png"
          },
          {
            name: "Cream",
            symbol: "CREAM",
            address: "0xd4CB328A82bDf5f03eB737f37Fa6B370aef3e888",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xd4CB328A82bDf5f03eB737f37Fa6B370aef3e888.png"
          },
          {
            name: "CertiK Token",
            symbol: "CTK",
            address: "0xA8c2B8eec3d368C0253ad3dae65a5F2BBB89c929",
            chainId: 56,
            decimals: 6,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xA8c2B8eec3d368C0253ad3dae65a5F2BBB89c929.png"
          },
          {
            name: "Concentrated Voting Power",
            symbol: "CVP",
            address: "0x5Ec3AdBDae549Dce842e24480Eb2434769e22B2E",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5Ec3AdBDae549Dce842e24480Eb2434769e22B2E.png"
          },
          {
            name: "Cyclone",
            symbol: "CYC",
            address: "0x810EE35443639348aDbbC467b33310d2AB43c168",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x810EE35443639348aDbbC467b33310d2AB43c168.png"
          },
          {
            name: "Binance Pegged DAI",
            symbol: "DAI",
            address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3.png"
          },
          {
            name: "Mines of Dalarnia",
            symbol: "DAR",
            address: "0x23CE9e926048273eF83be0A3A8Ba9Cb6D45cd978",
            chainId: 56,
            decimals: 6,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x23CE9e926048273eF83be0A3A8Ba9Cb6D45cd978.png"
          },
          {
            name: "Dego.Finance",
            symbol: "DEGO",
            address: "0x3FdA9383A84C05eC8f7630Fe10AdF1fAC13241CC",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x3FdA9383A84C05eC8f7630Fe10AdF1fAC13241CC.png"
          },
          {
            name: "Deri",
            symbol: "DERI",
            address: "0xe60eaf5A997DFAe83739e035b005A33AfdCc6df5",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xe60eaf5A997DFAe83739e035b005A33AfdCc6df5.png"
          },
          {
            name: "DeXe",
            symbol: "DEXE",
            address: "0x039cB485212f996A9DBb85A9a75d898F94d38dA6",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x039cB485212f996A9DBb85A9a75d898F94d38dA6.png"
          },
          {
            name: "DefiDollar DAO",
            symbol: "DFD",
            address: "0x9899a98b222fCb2f3dbee7dF45d943093a4ff9ff",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x9899a98b222fCb2f3dbee7dF45d943093a4ff9ff.png"
          },
          {
            name: "DFuture",
            symbol: "DFT",
            address: "0x42712dF5009c20fee340B245b510c0395896cF6e",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x42712dF5009c20fee340B245b510c0395896cF6e.png"
          },
          {
            name: "Decentral Games",
            symbol: "DG",
            address: "0x9Fdc3ae5c814b79dcA2556564047C5e7e5449C19",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x9Fdc3ae5c814b79dcA2556564047C5e7e5449C19.png"
          },
          {
            name: "Ditto",
            symbol: "DITTO",
            address: "0x233d91A0713155003fc4DcE0AFa871b508B3B715",
            chainId: 56,
            decimals: 9,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x233d91A0713155003fc4DcE0AFa871b508B3B715.png"
          },
          {
            name: "Duelist King",
            symbol: "DKT",
            address: "0x7Ceb519718A80Dd78a8545AD8e7f401dE4f2faA7",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x7Ceb519718A80Dd78a8545AD8e7f401dE4f2faA7.png"
          },
          {
            name: "Dodo",
            symbol: "DODO",
            address: "0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2.png"
          },
          {
            name: "Dogecoin",
            symbol: "DOGE",
            address: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xbA2aE424d960c26247Dd6c32edC70B295c744C43.png"
          },
          {
            name: "Dopple Finance",
            symbol: "DOP",
            address: "0x844FA82f1E54824655470970F7004Dd90546bB28",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x844FA82f1E54824655470970F7004Dd90546bB28.png"
          },
          {
            name: "Polkadot Token",
            symbol: "DOT",
            address: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402.png"
          },
          {
            name: "Diviner Protocol",
            symbol: "DPT",
            address: "0xE69cAef10A488D7AF31Da46c89154d025546e990",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xE69cAef10A488D7AF31Da46c89154d025546e990.png"
          },
          {
            name: "Dusk",
            symbol: "DUSK",
            address: "0xB2BD0749DBE21f623d9BABa856D3B0f0e1BFEc9C",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xB2BD0749DBE21f623d9BABa856D3B0f0e1BFEc9C.png"
          },
          {
            name: "Dvision Network",
            symbol: "DVI",
            address: "0x758FB037A375F17c7e195CC634D77dA4F554255B",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x758FB037A375F17c7e195CC634D77dA4F554255B.png"
          },
          {
            name: "Elrond",
            symbol: "EGLD",
            address: "0xbF7c81FFF98BbE61B40Ed186e4AfD6DDd01337fe",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xbF7c81FFF98BbE61B40Ed186e4AfD6DDd01337fe.png"
          },
          {
            name: "EOS Token",
            symbol: "EOS",
            address: "0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6.png"
          },
          {
            name: "Ellipsis",
            symbol: "EPS",
            address: "0xA7f552078dcC247C2684336020c03648500C6d9F",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xA7f552078dcC247C2684336020c03648500C6d9F.png"
          },
          {
            name: "Ertha Token",
            symbol: "ERTHA",
            address: "0x62823659d09F9F9D2222058878f89437425eB261",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x62823659d09F9F9D2222058878f89437425eB261.png"
          },
          {
            name: "CryptoMines Eternal",
            symbol: "ETERNAL",
            address: "0xD44FD09d74cd13838F137B590497595d6b3FEeA4",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xD44FD09d74cd13838F137B590497595d6b3FEeA4.png"
          },
          {
            name: "Binance Pegged ETH",
            symbol: "ETH",
            address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x2170Ed0880ac9A755fd29B2688956BD959F933F8.png"
          },
          {
            name: "Easy V2",
            symbol: "EZ",
            address: "0x5512014efa6Cd57764Fa743756F7a6Ce3358cC83",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5512014efa6Cd57764Fa743756F7a6Ce3358cC83.png"
          },
          {
            name: "Filecoin",
            symbol: "FIL",
            address: "0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153.png"
          },
          {
            name: "Defina Finance",
            symbol: "FINA",
            address: "0x426c72701833fdDBdFc06c944737C6031645c708",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x426c72701833fdDBdFc06c944737C6031645c708.png"
          },
          {
            name: "Refinable",
            symbol: "FINE",
            address: "0x4e6415a5727ea08aAE4580057187923aeC331227",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x4e6415a5727ea08aAE4580057187923aeC331227.png"
          },
          {
            name: "ForTube",
            symbol: "FOR",
            address: "0x658A109C5900BC6d2357c87549B651670E5b0539",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x658A109C5900BC6d2357c87549B651670E5b0539.png"
          },
          {
            name: "Formation Finance",
            symbol: "FORM",
            address: "0x25A528af62e56512A19ce8c3cAB427807c28CC19",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x25A528af62e56512A19ce8c3cAB427807c28CC19.png"
          },
          {
            name: "fry.world",
            symbol: "FRIES",
            address: "0x393B312C01048b3ed2720bF1B090084C09e408A1",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x393B312C01048b3ed2720bF1B090084C09e408A1.png"
          },
          {
            name: "Frontier Token",
            symbol: "FRONT",
            address: "0x928e55daB735aa8260AF3cEDadA18B5f70C72f1b",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x928e55daB735aa8260AF3cEDadA18B5f70C72f1b.png"
          },
          {
            name: "Froyo",
            symbol: "FROYO",
            address: "0xe369fec23380f9F14ffD07a1DC4b7c1a9fdD81c9",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xe369fec23380f9F14ffD07a1DC4b7c1a9fdD81c9.png"
          },
          {
            name: "Fuel",
            symbol: "FUEL",
            address: "0x2090c8295769791ab7A3CF1CC6e0AA19F35e441A",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x2090c8295769791ab7A3CF1CC6e0AA19F35e441A.png"
          },
          {
            name: "Fuse Token",
            symbol: "FUSE",
            address: "0x5857c96DaE9cF8511B08Cb07f85753C472D36Ea3",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5857c96DaE9cF8511B08Cb07f85753C472D36Ea3.png"
          },
          {
            name: "MetaGear Token",
            symbol: "GEAR",
            address: "0xb4404DaB7C0eC48b428Cf37DeC7fb628bcC41B36",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xb4404DaB7C0eC48b428Cf37DeC7fb628bcC41B36.png"
          },
          {
            name: "GoldMiner",
            symbol: "GM",
            address: "0xe2604C9561D490624AA35e156e65e590eB749519",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xe2604C9561D490624AA35e156e65e590eB749519.png"
          },
          {
            name: "GAMEE",
            symbol: "GMEE",
            address: "0x84e9a6F9D240FdD33801f7135908BfA16866939A",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x84e9a6F9D240FdD33801f7135908BfA16866939A.png"
          },
          {
            name: "Gourmet Galaxy",
            symbol: "GUM",
            address: "0xc53708664b99DF348dd27C3Ac0759d2DA9c40462",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xc53708664b99DF348dd27C3Ac0759d2DA9c40462.png"
          },
          {
            name: "Hacken",
            symbol: "HAI",
            address: "0xaA9E582e5751d703F85912903bacADdFed26484C",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xaA9E582e5751d703F85912903bacADdFed26484C.png"
          },
          {
            name: "Hakka Finance",
            symbol: "HAKKA",
            address: "0x1D1eb8E8293222e1a29d2C0E4cE6C0Acfd89AaaC",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x1D1eb8E8293222e1a29d2C0E4cE6C0Acfd89AaaC.png"
          },
          {
            name: "HARD",
            symbol: "HARD",
            address: "0xf79037F6f6bE66832DE4E7516be52826BC3cBcc4",
            chainId: 56,
            decimals: 6,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xf79037F6f6bE66832DE4E7516be52826BC3cBcc4.png"
          },
          {
            name: "Helmet.insure",
            symbol: "Helmet",
            address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8.png"
          },
          {
            name: "MetaHero",
            symbol: "HERO",
            address: "0xD40bEDb44C081D2935eebA6eF5a3c8A31A1bBE13",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xD40bEDb44C081D2935eebA6eF5a3c8A31A1bBE13.png"
          },
          {
            name: "StepHero",
            symbol: "HERO",
            address: "0xE8176d414560cFE1Bf82Fd73B986823B89E4F545",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xE8176d414560cFE1Bf82Fd73B986823B89E4F545.png"
          },
          {
            name: "Hedget",
            symbol: "HGET",
            address: "0xC7d8D35EBA58a0935ff2D5a33Df105DD9f071731",
            chainId: 56,
            decimals: 6,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xC7d8D35EBA58a0935ff2D5a33Df105DD9f071731.png"
          },
          {
            name: "Highstreet Token",
            symbol: "HIGH",
            address: "0x5f4Bde007Dc06b867f86EBFE4802e34A1fFEEd63",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5f4Bde007Dc06b867f86EBFE4802e34A1fFEEd63.png"
          },
          {
            name: "Hoo",
            symbol: "HOO",
            address: "0xE1d1F66215998786110Ba0102ef558b22224C016",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xE1d1F66215998786110Ba0102ef558b22224C016.png"
          },
          {
            name: "Hot Cross Token",
            symbol: "HOTCROSS",
            address: "0x4FA7163E153419E0E1064e418dd7A99314Ed27b6",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x4FA7163E153419E0E1064e418dd7A99314Ed27b6.png"
          },
          {
            name: "Hotbit",
            symbol: "HTB",
            address: "0x4e840AADD28DA189B9906674B4Afcb77C128d9ea",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x4e840AADD28DA189B9906674B4Afcb77C128d9ea.png"
          },
          {
            name: "HeroesTD",
            symbol: "HTD",
            address: "0x5E2689412Fae5c29BD575fbe1d5C1CD1e0622A8f",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5E2689412Fae5c29BD575fbe1d5C1CD1e0622A8f.png"
          },
          {
            name: "HYFI",
            symbol: "HYFI",
            address: "0x9a319b959e33369C5eaA494a770117eE3e585318",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x9a319b959e33369C5eaA494a770117eE3e585318.png"
          },
          {
            name: "Horizon Protocol",
            symbol: "HZN",
            address: "0xC0eFf7749b125444953ef89682201Fb8c6A917CD",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xC0eFf7749b125444953ef89682201Fb8c6A917CD.png"
          },
          {
            name: "Impossible Decentralized Incubator",
            symbol: "IDIA",
            address: "0x0b15Ddf19D47E6a86A56148fb4aFFFc6929BcB89",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x0b15Ddf19D47E6a86A56148fb4aFFFc6929BcB89.png"
          },
          {
            name: "Impossible Finance",
            symbol: "IF",
            address: "0xB0e1fc65C1a741b4662B813eB787d369b8614Af1",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xB0e1fc65C1a741b4662B813eB787d369b8614Af1.png"
          },
          {
            name: "Injective Protocol",
            symbol: "INJ",
            address: "0xa2B726B1145A4773F68593CF171187d8EBe4d495",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xa2B726B1145A4773F68593CF171187d8EBe4d495.png"
          },
          {
            name: "Bsc-Peg INSUR Token",
            symbol: "INSUR",
            address: "0x3192CCDdf1CDcE4Ff055EbC80f3F0231b86A7E30",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x3192CCDdf1CDcE4Ff055EbC80f3F0231b86A7E30.png"
          },
          {
            name: "IoTeX",
            symbol: "IOTX",
            address: "0x9678E42ceBEb63F23197D726B29b1CB20d0064E5",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x9678E42ceBEb63F23197D726B29b1CB20d0064E5.png"
          },
          {
            name: "Juggernaut Finance",
            symbol: "JGN",
            address: "0xC13B7a43223BB9Bf4B69BD68Ab20ca1B79d81C75",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xC13B7a43223BB9Bf4B69BD68Ab20ca1B79d81C75.png"
          },
          {
            name: "Juventus",
            symbol: "JUV",
            address: "0xC40C9A843E1c6D01b7578284a9028854f6683b1B",
            chainId: 56,
            decimals: 2,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xC40C9A843E1c6D01b7578284a9028854f6683b1B.png"
          },
          {
            name: "Kalmar",
            symbol: "KALM",
            address: "0x4BA0057f784858a48fe351445C672FF2a3d43515",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x4BA0057f784858a48fe351445C672FF2a3d43515.png"
          },
          {
            name: "Dragon Kart",
            symbol: "KART",
            address: "0x8BDd8DBcBDf0C066cA5f3286d33673aA7A553C10",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x8BDd8DBcBDf0C066cA5f3286d33673aA7A553C10.png"
          },
          {
            name: "KAVA",
            symbol: "KAVA",
            address: "0x5F88AB06e8dfe89DF127B2430Bba4Af600866035",
            chainId: 56,
            decimals: 6,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5F88AB06e8dfe89DF127B2430Bba4Af600866035.png"
          },
          {
            name: "Kattana",
            symbol: "KTN",
            address: "0xDAe6c2A48BFAA66b43815c5548b10800919c993E",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xDAe6c2A48BFAA66b43815c5548b10800919c993E.png"
          },
          {
            name: "Qian Governance Token",
            symbol: "KUN",
            address: "0x1A2fb0Af670D0234c2857FaD35b789F8Cb725584",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x1A2fb0Af670D0234c2857FaD35b789F8Cb725584.png"
          },
          {
            name: "FC Lazio Fan Token",
            symbol: "LAZIO",
            address: "0x77d547256A2cD95F32F67aE0313E450Ac200648d",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x77d547256A2cD95F32F67aE0313E450Ac200648d.png"
          },
          {
            name: "Lien",
            symbol: "LIEN",
            address: "0x5d684ADaf3FcFe9CFb5ceDe3abf02F0Cdd1012E3",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5d684ADaf3FcFe9CFb5ceDe3abf02F0Cdd1012E3.png"
          },
          {
            name: "Lightning",
            symbol: "LIGHT",
            address: "0x037838b556d9c9d654148a284682C55bB5f56eF4",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x037838b556d9c9d654148a284682C55bB5f56eF4.png"
          },
          {
            name: "Linear Finance",
            symbol: "LINA",
            address: "0x762539b45A1dCcE3D36d080F74d1AED37844b878",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x762539b45A1dCcE3D36d080F74d1AED37844b878.png"
          },
          {
            name: "ChainLink Token",
            symbol: "LINK",
            address: "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD.png"
          },
          {
            name: "Litentry",
            symbol: "LIT",
            address: "0xb59490aB09A0f526Cc7305822aC65f2Ab12f9723",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xb59490aB09A0f526Cc7305822aC65f2Ab12f9723.png"
          },
          {
            name: "Lympo Market Token",
            symbol: "LMT",
            address: "0x9617857E191354dbEA0b714d78Bc59e57C411087",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x9617857E191354dbEA0b714d78Bc59e57C411087.png"
          },
          {
            name: "Litecoin Token",
            symbol: "LTC",
            address: "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x4338665CBB7B2485A8855A139b75D5e34AB0DB94.png"
          },
          {
            name: "LTO Network",
            symbol: "LTO",
            address: "0x857B222Fc79e1cBBf8Ca5f78CB133d1b7CF34BBd",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x857B222Fc79e1cBBf8Ca5f78CB133d1b7CF34BBd.png"
          },
          {
            name: "lUSD",
            symbol: "lUSD",
            address: "0x23e8a70534308a4AAF76fb8C32ec13d17a3BD89e",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x23e8a70534308a4AAF76fb8C32ec13d17a3BD89e.png"
          },
          {
            name: "Mirror AMZN Token",
            symbol: "mAMZN",
            address: "0x3947B992DC0147D2D89dF0392213781b04B25075",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x3947B992DC0147D2D89dF0392213781b04B25075.png"
          },
          {
            name: "Unmarshal",
            symbol: "MARSH",
            address: "0x2FA5dAF6Fe0708fBD63b1A7D1592577284f52256",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x2FA5dAF6Fe0708fBD63b1A7D1592577284f52256.png"
          },
          {
            name: "Mask Network",
            symbol: "MASK",
            address: "0x2eD9a5C8C13b93955103B9a7C167B67Ef4d568a3",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x2eD9a5C8C13b93955103B9a7C167B67Ef4d568a3.png"
          },
          {
            name: "Math",
            symbol: "MATH",
            address: "0xF218184Af829Cf2b0019F8E6F0b2423498a36983",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xF218184Af829Cf2b0019F8E6F0b2423498a36983.png"
          },
          {
            name: "Mobox",
            symbol: "MBOX",
            address: "0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377.png"
          },
          {
            name: "MCDEX",
            symbol: "MCB",
            address: "0x5fE80d2CD054645b9419657d3d10d26391780A7B",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5fE80d2CD054645b9419657d3d10d26391780A7B.png"
          },
          {
            name: "Mirror COIN",
            symbol: "mCOIN",
            address: "0x49022089e78a8D46Ec87A3AF86a1Db6c189aFA6f",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x49022089e78a8D46Ec87A3AF86a1Db6c189aFA6f.png"
          },
          {
            name: "MacaronSwap",
            symbol: "MCRN",
            address: "0xacb2d47827C9813AE26De80965845D80935afd0B",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xacb2d47827C9813AE26De80965845D80935afd0B.png"
          },
          {
            name: "Mirror GOOGL Token",
            symbol: "mGOOGL",
            address: "0x62D71B23bF15218C7d2D7E48DBbD9e9c650B173f",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x62D71B23bF15218C7d2D7E48DBbD9e9c650B173f.png"
          },
          {
            name: "Mirror Finance",
            symbol: "MIR",
            address: "0x5B6DcF557E2aBE2323c48445E8CC948910d8c2c9",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5B6DcF557E2aBE2323c48445E8CC948910d8c2c9.png"
          },
          {
            name: "Mix",
            symbol: "MIX",
            address: "0xB67754f5b4C704A24d2db68e661b2875a4dDD197",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xB67754f5b4C704A24d2db68e661b2875a4dDD197.png"
          },
          {
            name: "Mirror NFLX Token",
            symbol: "mNFLX",
            address: "0xa04F060077D90Fe2647B61e4dA4aD1F97d6649dc",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xa04F060077D90Fe2647B61e4dA4aD1F97d6649dc.png"
          },
          {
            name: "Monsta Infinite",
            symbol: "MONI",
            address: "0x9573c88aE3e37508f87649f87c4dd5373C9F31e0",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x9573c88aE3e37508f87649f87c4dd5373C9F31e0.png"
          },
          {
            name: "Meter",
            symbol: "MTRG",
            address: "0xBd2949F67DcdC549c6Ebe98696449Fa79D988A9F",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xBd2949F67DcdC549c6Ebe98696449Fa79D988A9F.png"
          },
          {
            name: "Mirror TSLA Token",
            symbol: "mTSLA",
            address: "0xF215A127A196e3988C09d052e16BcFD365Cd7AA3",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xF215A127A196e3988C09d052e16BcFD365Cd7AA3.png"
          },
          {
            name: "MX Token",
            symbol: "MX",
            address: "0x9F882567A62a5560d147d64871776EeA72Df41D3",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x9F882567A62a5560d147d64871776EeA72Df41D3.png"
          },
          {
            name: "Nabox Token",
            symbol: "NABOX",
            address: "0x755f34709E369D37C6Fa52808aE84A32007d1155",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x755f34709E369D37C6Fa52808aE84A32007d1155.png"
          },
          {
            name: "NAOS Finance",
            symbol: "NAOS",
            address: "0x758d08864fB6cCE3062667225ca10b8F00496cc2",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x758d08864fB6cCE3062667225ca10b8F00496cc2.png"
          },
          {
            name: "NAR Token",
            symbol: "NAR",
            address: "0xA1303E6199b319a891b79685F0537D289af1FC83",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xA1303E6199b319a891b79685F0537D289af1FC83.png"
          },
          {
            name: "APENFT",
            symbol: "NFT",
            address: "0x1fC9004eC7E5722891f5f38baE7678efCB11d34D",
            chainId: 56,
            decimals: 6,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x1fC9004eC7E5722891f5f38baE7678efCB11d34D.png"
          },
          {
            name: "Nerve Finance",
            symbol: "NRV",
            address: "0x42F6f551ae042cBe50C739158b4f0CAC0Edb9096",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x42F6f551ae042cBe50C739158b4f0CAC0Edb9096.png"
          },
          {
            name: "Nuls",
            symbol: "NULS",
            address: "0x8CD6e29d3686d24d3C2018CEe54621eA0f89313B",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x8CD6e29d3686d24d3C2018CEe54621eA0f89313B.png"
          },
          {
            name: "NerveNetwork",
            symbol: "NVT",
            address: "0xf0E406c49C63AbF358030A299C0E00118C4C6BA5",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xf0E406c49C63AbF358030A299C0E00118C4C6BA5.png"
          },
          {
            name: "Nyanswop Token",
            symbol: "NYA",
            address: "0xbFa0841F7a90c4CE6643f651756EE340991F99D5",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xbFa0841F7a90c4CE6643f651756EE340991F99D5.png"
          },
          {
            name: "O3 Swap",
            symbol: "O3",
            address: "0xEe9801669C6138E84bD50dEB500827b776777d28",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xEe9801669C6138E84bD50dEB500827b776777d28.png"
          },
          {
            name: "Oddz",
            symbol: "ODDZ",
            address: "0xCD40F2670CF58720b694968698A5514e924F742d",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xCD40F2670CF58720b694968698A5514e924F742d.png"
          },
          {
            name: "OG",
            symbol: "OG",
            address: "0xf05E45aD22150677a017Fbd94b84fBB63dc9b44c",
            chainId: 56,
            decimals: 2,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xf05E45aD22150677a017Fbd94b84fBB63dc9b44c.png"
          },
          {
            name: "Oin Finance",
            symbol: "OIN",
            address: "0x658E64FFcF40D240A43D52CA9342140316Ae44fA",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x658E64FFcF40D240A43D52CA9342140316Ae44fA.png"
          },
          {
            name: "Harmony One",
            symbol: "ONE",
            address: "0x03fF0ff224f904be3118461335064bB48Df47938",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x03fF0ff224f904be3118461335064bB48Df47938.png"
          },
          {
            name: "BigOne Token",
            symbol: "ONE",
            address: "0x04BAf95Fd4C52fd09a56D840bAEe0AB8D7357bf0",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x04BAf95Fd4C52fd09a56D840bAEe0AB8D7357bf0.png"
          },
          {
            name: "Ontology Token",
            symbol: "ONT",
            address: "0xFd7B3A77848f1C2D67E05E54d78d174a0C850335",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xFd7B3A77848f1C2D67E05E54d78d174a0C850335.png"
          },
          {
            name: "The Orbs Network",
            symbol: "ORBS",
            address: "0xeBd49b26169e1b52c04cFd19FCf289405dF55F80",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xeBd49b26169e1b52c04cFd19FCf289405dF55F80.png"
          },
          {
            name: "pBTC",
            symbol: "pBTC",
            address: "0xeD28A457A5A76596ac48d87C0f577020F6Ea1c4C",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xeD28A457A5A76596ac48d87C0f577020F6Ea1c4C.png"
          },
          {
            name: "PolyCrowns",
            symbol: "pCWS",
            address: "0xbcf39F0EDDa668C58371E519AF37CA705f2bFcbd",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xbcf39F0EDDa668C58371E519AF37CA705f2bFcbd.png"
          },
          {
            name: "Perlin X",
            symbol: "PERL",
            address: "0x0F9E4D49f25de22c2202aF916B681FBB3790497B",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x0F9E4D49f25de22c2202aF916B681FBB3790497B.png"
          },
          {
            name: "Phala Network",
            symbol: "PHA",
            address: "0x0112e557d400474717056C4e6D40eDD846F38351",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x0112e557d400474717056C4e6D40eDD846F38351.png"
          },
          {
            name: "Polkamon",
            symbol: "PMON",
            address: "0x1796ae0b0fa4862485106a0de9b654eFE301D0b2",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x1796ae0b0fa4862485106a0de9b654eFE301D0b2.png"
          },
          {
            name: "PNT",
            symbol: "PNT",
            address: "0xdaacB0Ab6Fb34d24E8a67BfA14BF4D95D4C7aF92",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xdaacB0Ab6Fb34d24E8a67BfA14BF4D95D4C7aF92.png"
          },
          {
            name: "pTokens OPEN",
            symbol: "pOPEN",
            address: "0xaBaE871B7E3b67aEeC6B46AE9FE1A91660AadAC5",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xaBaE871B7E3b67aEeC6B46AE9FE1A91660AadAC5.png"
          },
          {
            name: "FC Porto Fan Token",
            symbol: "PORTO",
            address: "0x49f2145d6366099e13B10FbF80646C0F377eE7f6",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x49f2145d6366099e13B10FbF80646C0F377eE7f6.png"
          },
          {
            name: "Moonpot",
            symbol: "POTS",
            address: "0x3Fcca8648651E5b974DD6d3e50F61567779772A8",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x3Fcca8648651E5b974DD6d3e50F61567779772A8.png"
          },
          {
            name: "Parallel Token",
            symbol: "PRL",
            address: "0xd07e82440A395f3F3551b42dA9210CD1Ef4f8B24",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xd07e82440A395f3F3551b42dA9210CD1Ef4f8B24.png"
          },
          {
            name: "Prometeus",
            symbol: "PROM",
            address: "0xaF53d56ff99f1322515E54FdDE93FF8b3b7DAFd5",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xaF53d56ff99f1322515E54FdDE93FF8b3b7DAFd5.png"
          },
          {
            name: "Prosper",
            symbol: "PROS",
            address: "0xEd8c8Aa8299C10f067496BB66f8cC7Fb338A3405",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xEd8c8Aa8299C10f067496BB66f8cC7Fb338A3405.png"
          },
          {
            name: "Paris Saint-Germain",
            symbol: "PSG",
            address: "0xBc5609612b7C44BEf426De600B5fd1379DB2EcF1",
            chainId: 56,
            decimals: 2,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xBc5609612b7C44BEf426De600B5fd1379DB2EcF1.png"
          },
          {
            name: "Qubit Token",
            symbol: "QBT",
            address: "0x17B7163cf1Dbd286E262ddc68b553D899B93f526",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x17B7163cf1Dbd286E262ddc68b553D899B93f526.png"
          },
          {
            name: "BENQI",
            symbol: "QI",
            address: "0x8729438EB15e2C8B576fCc6AeCdA6A148776C0F5",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x8729438EB15e2C8B576fCc6AeCdA6A148776C0F5.png"
          },
          {
            name: "QuarkChain Token",
            symbol: "QKC",
            address: "0xA1434F1FC3F437fa33F7a781E041961C0205B5Da",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xA1434F1FC3F437fa33F7a781E041961C0205B5Da.png"
          },
          {
            name: "QIAN second generation dollar",
            symbol: "QSD",
            address: "0x07AaA29E63FFEB2EBf59B33eE61437E1a91A3bb2",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x07AaA29E63FFEB2EBf59B33eE61437E1a91A3bb2.png"
          },
          {
            name: "Quidd Token",
            symbol: "QUIDD",
            address: "0x7961Ade0a767c0E5B67Dd1a1F78ba44F727642Ed",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x7961Ade0a767c0E5B67Dd1a1F78ba44F727642Ed.png"
          },
          {
            name: "QUSD Stablecoin",
            symbol: "QUSD",
            address: "0xb8C540d00dd0Bf76ea12E4B4B95eFC90804f924E",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xb8C540d00dd0Bf76ea12E4B4B95eFC90804f924E.png"
          },
          {
            name: "Rabbit Finance",
            symbol: "RABBIT",
            address: "0x95a1199EBA84ac5f19546519e287d43D2F0E1b41",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x95a1199EBA84ac5f19546519e287d43D2F0E1b41.png"
          },
          {
            name: "Radio Caca V2",
            symbol: "RACA",
            address: "0x12BB890508c125661E03b09EC06E404bc9289040",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x12BB890508c125661E03b09EC06E404bc9289040.png"
          },
          {
            name: "Ramp DEFI",
            symbol: "RAMP",
            address: "0x8519EA49c997f50cefFa444d240fB655e89248Aa",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x8519EA49c997f50cefFa444d240fB655e89248Aa.png"
          },
          {
            name: "Reef",
            symbol: "REEF",
            address: "0xF21768cCBC73Ea5B6fd3C687208a7c2def2d966e",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xF21768cCBC73Ea5B6fd3C687208a7c2def2d966e.png"
          },
          {
            name: "renBTC",
            symbol: "renBTC",
            address: "0xfCe146bF3146100cfe5dB4129cf6C82b0eF4Ad8c",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xfCe146bF3146100cfe5dB4129cf6C82b0eF4Ad8c.png"
          },
          {
            name: "renDOGE",
            symbol: "renDOGE",
            address: "0xc3fEd6eB39178A541D274e6Fc748d48f0Ca01CC3",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xc3fEd6eB39178A541D274e6Fc748d48f0Ca01CC3.png"
          },
          {
            name: "renZEC",
            symbol: "renZEC",
            address: "0x695FD30aF473F2960e81Dc9bA7cB67679d35EDb7",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x695FD30aF473F2960e81Dc9bA7cB67679d35EDb7.png"
          },
          {
            name: "REVV",
            symbol: "REVV",
            address: "0x833F307aC507D47309fD8CDD1F835BeF8D702a93",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x833F307aC507D47309fD8CDD1F835BeF8D702a93.png"
          },
          {
            name: "RFOX",
            symbol: "RFOX",
            address: "0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5.png"
          },
          {
            name: "Rangers Protocol",
            symbol: "RPG",
            address: "0xc2098a8938119A52B1F7661893c0153A6CB116d5",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xc2098a8938119A52B1F7661893c0153A6CB116d5.png"
          },
          {
            name: "rUSD",
            symbol: "rUSD",
            address: "0x07663837218A003e66310a01596af4bf4e44623D",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x07663837218A003e66310a01596af4bf4e44623D.png"
          },
          {
            name: "FC Santos Fan Token",
            symbol: "SANTOS",
            address: "0xA64455a4553C9034236734FadDAddbb64aCE4Cc7",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xA64455a4553C9034236734FadDAddbb64aCE4Cc7.png"
          },
          {
            name: "bDollar Share",
            symbol: "sBDO",
            address: "0x0d9319565be7f53CeFE84Ad201Be3f40feAE2740",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x0d9319565be7f53CeFE84Ad201Be3f40feAE2740.png"
          },
          {
            name: "Singularity Dao",
            symbol: "SDAO",
            address: "0x90Ed8F1dc86388f14b64ba8fb4bbd23099f18240",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x90Ed8F1dc86388f14b64ba8fb4bbd23099f18240.png"
          },
          {
            name: "SafePal Token",
            symbol: "SFP",
            address: "0xD41FDb03Ba84762dD66a0af1a6C8540FF1ba5dfb",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xD41FDb03Ba84762dD66a0af1a6C8540FF1ba5dfb.png"
          },
          {
            name: "Seedify",
            symbol: "SFUND",
            address: "0x477bC8d23c634C154061869478bce96BE6045D12",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x477bC8d23c634C154061869478bce96BE6045D12.png"
          },
          {
            name: "Sheesha Finance",
            symbol: "SHEESHA",
            address: "0x232FB065D9d24c34708eeDbF03724f2e95ABE768",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x232FB065D9d24c34708eeDbF03724f2e95ABE768.png"
          },
          {
            name: "CryptoBlades Skill Token",
            symbol: "SKILL",
            address: "0x154A9F9cbd3449AD22FDaE23044319D6eF2a1Fab",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x154A9F9cbd3449AD22FDaE23044319D6eF2a1Fab.png"
          },
          {
            name: "SPARTAN PROTOCOL TOKEN",
            symbol: "SPARTA",
            address: "0x3910db0600eA925F63C36DdB1351aB6E2c6eb102",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x3910db0600eA925F63C36DdB1351aB6E2c6eb102.png"
          },
          {
            name: "Splintershards",
            symbol: "SPS",
            address: "0x1633b7157e7638C4d6593436111Bf125Ee74703F",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x1633b7157e7638C4d6593436111Bf125Ee74703F.png"
          },
          {
            name: "StableXSwap",
            symbol: "STAX",
            address: "0x0Da6Ed8B13214Ff28e9Ca979Dd37439e8a88F6c4",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x0Da6Ed8B13214Ff28e9Ca979Dd37439e8a88F6c4.png"
          },
          {
            name: "Sushi",
            symbol: "SUSHI",
            address: "0x947950BcC74888a40Ffa2593C5798F11Fc9124C4",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x947950BcC74888a40Ffa2593C5798F11Fc9124C4.png"
          },
          {
            name: "Suterusu",
            symbol: "SUTER",
            address: "0x4CfbBdfBd5BF0814472fF35C72717Bd095ADa055",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x4CfbBdfBd5BF0814472fF35C72717Bd095ADa055.png"
          },
          {
            name: "Swampy",
            symbol: "SWAMP",
            address: "0xc5A49b4CBe004b6FD55B30Ba1dE6AC360FF9765d",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xc5A49b4CBe004b6FD55B30Ba1dE6AC360FF9765d.png"
          },
          {
            name: "SWGToken",
            symbol: "SWG",
            address: "0xe792f64C582698b8572AAF765bDC426AC3aEfb6B",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xe792f64C582698b8572AAF765bDC426AC3aEfb6B.png"
          },
          {
            name: "Swingby",
            symbol: "SWINGBY",
            address: "0x71DE20e0C4616E7fcBfDD3f875d568492cBE4739",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x71DE20e0C4616E7fcBfDD3f875d568492cBE4739.png"
          },
          {
            name: "Switcheo",
            symbol: "SWTH",
            address: "0x250b211EE44459dAd5Cd3bCa803dD6a7EcB5d46C",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x250b211EE44459dAd5Cd3bCa803dD6a7EcB5d46C.png"
          },
          {
            name: "Swipe",
            symbol: "SXP",
            address: "0x47BEAd2563dCBf3bF2c9407fEa4dC236fAbA485A",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x47BEAd2563dCBf3bF2c9407fEa4dC236fAbA485A.png"
          },
          {
            name: "Tau Bitcoin",
            symbol: "tBTC",
            address: "0x2cD1075682b0FCCaADd0Ca629e138E64015Ba11c",
            chainId: 56,
            decimals: 9,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x2cD1075682b0FCCaADd0Ca629e138E64015Ba11c.png"
          },
          {
            name: "Tau DOGE",
            symbol: "tDOGE",
            address: "0xe550a593d09FBC8DCD557b5C88Cea6946A8b404A",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xe550a593d09FBC8DCD557b5C88Cea6946A8b404A.png"
          },
          {
            name: "Tenet",
            symbol: "TEN",
            address: "0xdFF8cb622790b7F92686c722b02CaB55592f152C",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xdFF8cb622790b7F92686c722b02CaB55592f152C.png"
          },
          {
            name: "Thetan Gem",
            symbol: "THG",
            address: "0x9fD87aEfe02441B123c3c32466cD9dB4c578618f",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x9fD87aEfe02441B123c3c32466cD9dB4c578618f.png"
          },
          {
            name: "TitanSwap",
            symbol: "TITAN",
            address: "0xe898EDc43920F357A93083F1d4460437dE6dAeC2",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xe898EDc43920F357A93083F1d4460437dE6dAeC2.png"
          },
          {
            name: "TokoCrypto",
            symbol: "TKO",
            address: "0x9f589e3eabe42ebC94A44727b3f3531C0c877809",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x9f589e3eabe42ebC94A44727b3f3531C0c877809.png"
          },
          {
            name: "Alien Worlds",
            symbol: "TLM",
            address: "0x2222227E22102Fe3322098e4CBfE18cFebD57c95",
            chainId: 56,
            decimals: 4,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x2222227E22102Fe3322098e4CBfE18cFebD57c95.png"
          },
          {
            name: "Telos",
            symbol: "TLOS",
            address: "0xb6C53431608E626AC81a9776ac3e999c5556717c",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xb6C53431608E626AC81a9776ac3e999c5556717c.png"
          },
          {
            name: "TokenPocket",
            symbol: "TPT",
            address: "0xECa41281c24451168a37211F0bc2b8645AF45092",
            chainId: 56,
            decimals: 4,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xECa41281c24451168a37211F0bc2b8645AF45092.png"
          },
          {
            name: "Unitrade",
            symbol: "TRADE",
            address: "0x7af173F350D916358AF3e218Bdf2178494Beb748",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x7af173F350D916358AF3e218Bdf2178494Beb748.png"
          },
          {
            name: "Tron",
            symbol: "TRX",
            address: "0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B.png"
          },
          {
            name: "Thunder Token",
            symbol: "TT",
            address: "0x990E7154bB999FAa9b2fa5Ed29E822703311eA85",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x990E7154bB999FAa9b2fa5Ed29E822703311eA85.png"
          },
          {
            name: "True USD",
            symbol: "TUSD",
            address: "0x14016E85a25aeb13065688cAFB43044C2ef86784",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x14016E85a25aeb13065688cAFB43044C2ef86784.png"
          },
          {
            name: "Trust Wallet",
            symbol: "TWT",
            address: "0x4B0F1812e5Df2A09796481Ff14017e6005508003",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x4B0F1812e5Df2A09796481Ff14017e6005508003.png"
          },
          {
            name: "Tixl",
            symbol: "TXL",
            address: "0x1FFD0b47127fdd4097E54521C9E2c7f0D66AafC5",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x1FFD0b47127fdd4097E54521C9E2c7f0D66AafC5.png"
          },
          {
            name: "UpBots",
            symbol: "UBXT",
            address: "0xBbEB90cFb6FAFa1F69AA130B7341089AbeEF5811",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xBbEB90cFb6FAFa1F69AA130B7341089AbeEF5811.png"
          },
          {
            name: "Unifi Token",
            symbol: "UNFI",
            address: "0x728C5baC3C3e370E372Fc4671f9ef6916b814d8B",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x728C5baC3C3e370E372Fc4671f9ef6916b814d8B.png"
          },
          {
            name: "Uniswap",
            symbol: "UNI",
            address: "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xBf5140A22578168FD562DCcF235E5D43A02ce9B1.png"
          },
          {
            name: "Binance Pegged USD Coin",
            symbol: "USDC",
            address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d.png"
          },
          {
            name: "Binance Pegged USDT",
            symbol: "USDT",
            address: "0x55d398326f99059fF775485246999027B3197955",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x55d398326f99059fF775485246999027B3197955.png"
          },
          {
            name: "USDX",
            symbol: "USDX",
            address: "0x1203355742e76875154C0D13eB81DCD7711dC7d9",
            chainId: 56,
            decimals: 6,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x1203355742e76875154C0D13eB81DCD7711dC7d9.png"
          },
          {
            name: "UST Token",
            symbol: "UST",
            address: "0x23396cF899Ca06c4472205fC903bDB4de249D6fC",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x23396cF899Ca06c4472205fC903bDB4de249D6fC.png"
          },
          {
            name: "VAI Stablecoin",
            symbol: "VAI",
            address: "0x4BD17003473389A42DAF6a0a729f6Fdb328BbBd7",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x4BD17003473389A42DAF6a0a729f6Fdb328BbBd7.png"
          },
          {
            name: "Venus Reward Token",
            symbol: "VRT",
            address: "0x5F84ce30DC3cF7909101C69086c50De191895883",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5F84ce30DC3cF7909101C69086c50De191895883.png"
          },
          {
            name: "Yieldwatch",
            symbol: "WATCH",
            address: "0x7A9f28EB62C791422Aa23CeAE1dA9C847cBeC9b0",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x7A9f28EB62C791422Aa23CeAE1dA9C847cBeC9b0.png"
          },
          {
            name: "Wault",
            symbol: "WAULTx",
            address: "0xB64E638E60D154B43f660a6BF8fD8a3b249a6a21",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xB64E638E60D154B43f660a6BF8fD8a3b249a6a21.png"
          },
          {
            name: "WBNB Token",
            symbol: "WBNB",
            address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c.png"
          },
          {
            name: "BitWell Token",
            symbol: "WELL",
            address: "0xf07a32Eb035b786898c00bB1C64d8c6F8E7a46D5",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xf07a32Eb035b786898c00bB1C64d8c6F8E7a46D5.png"
          },
          {
            name: "WaultSwap",
            symbol: "WEX",
            address: "0xa9c41A46a6B3531d28d5c32F6633dd2fF05dFB90",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xa9c41A46a6B3531d28d5c32F6633dd2fF05dFB90.png"
          },
          {
            name: "WINk",
            symbol: "WIN",
            address: "0xaeF0d72a118ce24feE3cD1d43d383897D05B4e99",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xaeF0d72a118ce24feE3cD1d43d383897D05B4e99.png"
          },
          {
            name: "Wrapped MASS",
            symbol: "WMASS",
            address: "0x7e396BfC8a2f84748701167c2d622F041A1D7a17",
            chainId: 56,
            decimals: 8,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x7e396BfC8a2f84748701167c2d622F041A1D7a17.png"
          },
          {
            name: "Wootrade",
            symbol: "WOO",
            address: "0x4691937a7508860F876c9c0a2a617E7d9E945D4B",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x4691937a7508860F876c9c0a2a617E7d9E945D4B.png"
          },
          {
            name: "Woonkly Power",
            symbol: "WOOP",
            address: "0x8b303d5BbfBbf46F1a4d9741E491e06986894e18",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x8b303d5BbfBbf46F1a4d9741E491e06986894e18.png"
          },
          {
            name: "Wall Street Games",
            symbol: "WSG",
            address: "0xA58950F05FeA2277d2608748412bf9F802eA4901",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xA58950F05FeA2277d2608748412bf9F802eA4901.png"
          },
          {
            name: "Soteria",
            symbol: "wSOTE",
            address: "0x541E619858737031A1244A5d0Cd47E5ef480342c",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x541E619858737031A1244A5d0Cd47E5ef480342c.png"
          },
          {
            name: "Xcademy",
            symbol: "XCAD",
            address: "0x431e0cD023a32532BF3969CddFc002c00E98429d",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x431e0cD023a32532BF3969CddFc002c00E98429d.png"
          },
          {
            name: "XCarnival",
            symbol: "XCV",
            address: "0x4be63a9b26EE89b9a3a13fd0aA1D0b2427C135f8",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x4be63a9b26EE89b9a3a13fd0aA1D0b2427C135f8.png"
          },
          {
            name: "Exeedme",
            symbol: "XED",
            address: "0x5621b5A3f4a8008c4CCDd1b942B121c8B1944F1f",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x5621b5A3f4a8008c4CCDd1b942B121c8B1944F1f.png"
          },
          {
            name: "XEND",
            symbol: "XEND",
            address: "0x4a080377f83D669D7bB83B3184a8A5E61B500608",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x4a080377f83D669D7bB83B3184a8A5E61B500608.png"
          },
          {
            name: "xMARK",
            symbol: "xMARK",
            address: "0x26A5dFab467d4f58fB266648CAe769503CEC9580",
            chainId: 56,
            decimals: 9,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x26A5dFab467d4f58fB266648CAe769503CEC9580.png"
          },
          {
            name: "Mars Ecosystem",
            symbol: "XMS",
            address: "0x7859B01BbF675d67Da8cD128a50D155cd881B576",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x7859B01BbF675d67Da8cD128a50D155cd881B576.png"
          },
          {
            name: "XRP Token",
            symbol: "XRP",
            address: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE.png"
          },
          {
            name: "Tezos Token",
            symbol: "XTZ",
            address: "0x16939ef78684453bfDFb47825F8a5F714f12623a",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x16939ef78684453bfDFb47825F8a5F714f12623a.png"
          },
          {
            name: "Venus Token",
            symbol: "XVS",
            address: "0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63.png"
          },
          {
            name: "X World Games",
            symbol: "XWG",
            address: "0x6b23C89196DeB721e6Fd9726E6C76E4810a464bc",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x6b23C89196DeB721e6Fd9726E6C76E4810a464bc.png"
          },
          {
            name: "yearn.finance",
            symbol: "YFI",
            address: "0x88f1A5ae2A3BF98AEAF342D26B30a79438c9142e",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x88f1A5ae2A3BF98AEAF342D26B30a79438c9142e.png"
          },
          {
            name: "YFII.finance Token",
            symbol: "YFII",
            address: "0x7F70642d88cf1C4a3a7abb072B53B929b653edA5",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x7F70642d88cf1C4a3a7abb072B53B929b653edA5.png"
          },
          {
            name: "Zcash Token",
            symbol: "ZEC",
            address: "0x1Ba42e5193dfA8B03D15dd1B86a3113bbBEF8Eeb",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x1Ba42e5193dfA8B03D15dd1B86a3113bbBEF8Eeb.png"
          },
          {
            name: "ZeroSwapToken",
            symbol: "ZEE",
            address: "0x44754455564474A89358B2C2265883DF993b12F0",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x44754455564474A89358B2C2265883DF993b12F0.png"
          },
          {
            name: "Zilliqa",
            symbol: "ZIL",
            address: "0xb86AbCb37C3A4B64f74f59301AFF131a1BEcC787",
            chainId: 56,
            decimals: 12,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0xb86AbCb37C3A4B64f74f59301AFF131a1BEcC787.png"
          },
          {
            name: "ZOO Crypto World",
            symbol: "ZOO",
            address: "0x1D229B958D5DDFca92146585a8711aECbE56F095",
            chainId: 56,
            decimals: 18,
            logoURI:
              "https://tokens.pancakeswap.finance/images/0x1D229B958D5DDFca92146585a8711aECbE56F095.png"
          }
        ]
      },
      pendingUpdate: null,
      error: null,
      loadingRequestId: "-mSqfS6IPyQHGdlnoArbf"
    }
  };
}

function combineMaps(
  map1: TokenAddressMap,
  map2: TokenAddressMap
): TokenAddressMap {
  return {
    [ChainId.MAINNET]: { ...map1[ChainId.MAINNET], ...map2[ChainId.MAINNET] },
    [ChainId.TESTNET]: { ...map1[ChainId.TESTNET], ...map2[ChainId.TESTNET] }
  };
}

// merge tokens contained within lists from urls
function useCombinedTokenMapFromUrls(
  urls: string[] | undefined
): TokenAddressMap {
  const lists = useAllLists();

  return useMemo(() => {
    if (!urls) return EMPTY_LIST;

    return (
      urls
        .slice()
        // sort by priority so top priority goes last
        .sort(sortByListPriority)
        .reduce((allTokens, currentUrl) => {
          const current = lists[currentUrl]?.current;
          if (!current) return allTokens;
          try {
            const newTokens = Object.assign(listToTokenMap(current));
            return combineMaps(allTokens, newTokens);
          } catch (error) {
            console.error("Could not show token list due to error", error);
            return allTokens;
          }
        }, EMPTY_LIST)
    );
  }, [lists, urls]);
}

// filter out unsupported lists
export function useActiveListUrls(): string[] | undefined {
  // return useSelector<AppState, AppState["lists"]["activeListUrls"]>(
  //   state => state.lists.activeListUrls
  // )?.filter(url => !UNSUPPORTED_LIST_URLS.includes(url));
  return [
    "https://tokens.pancakeswap.finance/pancakeswap-top-100.json",
    "https://tokens.pancakeswap.finance/pancakeswap-extended.json"
  ].filter(url => !UNSUPPORTED_LIST_URLS.includes(url));
}

// get all the tokens from active lists, combine with local default tokens
export function useCombinedActiveList(): TokenAddressMap {
  const activeListUrls = useActiveListUrls();
  const activeTokens = useCombinedTokenMapFromUrls(activeListUrls);
  const defaultTokenMap = listToTokenMap(DEFAULT_TOKEN_LIST);
  return combineMaps(activeTokens, defaultTokenMap);
}
