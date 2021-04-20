# Genesis Vision Protocol Contracts Repository

[Genesis Vision Protocol](https://genesis.vision) is a smart contracts for decentralized assset management on the Ethereum and the BSC (Binance Smart Chain) blockchains.

## GenesisVisionGateway

Gateway allowing communication with centralized assets ([Funds](https://genesis.vision/invest/funds) and [Programs](https://genesis.vision/invest/programs)) of Genesis Vision assets. Investments and withdrawals are carried out through a smart contract.

## DeFi Programs and Funds

DeFi Programs and Funds infrastructure is based on the "Coffer" entity. This is an abstraction, which implements ERC20 (BEP20 for BSC) protocol over the assets under management. Coffer provides functionality for investments and withdrawals via Tokens Issue or Redeem together with manager's and investors' share calculation.

Primarily, users will be interacting with Program and Fund entities. The functionality of those entities is very similar to what you've already seen in our current Genesis Vision Programs and Funds.

Program allows manager to perform trades through the smart contract, which utilizes connected decentralized liquidity. Fund is similar to Program, the difference is that instead of direct trading, it's being managed in a declarative manner by setting up required target allocations of assets.

## Roadmap

**14th of April**
~~Genesis Vision Gateway launch on the Binance Smart Chain~~

**19th of April**
~~Genesis Vision Gateway launch on the XDAI~~

**10th of May**
Genesis Vision Protocol launch Programs with GV Liquidity on Ethereum

**13th of May**
Genesis Vision Protocol launch Funds with GV Liquidity on Ethereum

**20th of May**
Genesis Vision Protocol launch Programs with GV Liquidity on BCS (Binance Smart Chain)

**21th of May**
Genesis Vision Protocol launch Funds with GV Liquidity on BCS (Binance Smart Chain)

**25th of May**
Launch of the first 10 GV funds and 10 programs from top GV managers in the Genesis Vision Protocol

**9th of June**
First Trading Competition on Genesis Vision Protocol with a prize fund $25,000
