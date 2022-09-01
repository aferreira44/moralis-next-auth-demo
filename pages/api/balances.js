import Moralis from "moralis";
const { EvmChain } = require("@moralisweb3/evm-utils");

export default async function handler(req, res) {
  // reads the api key from .env.local and starts Moralis SDK
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  const address = process.env.ADDRESS;
  const chain = EvmChain.MUMBAI;

  // Promise.all() for receiving data async from two endpoints
  const [nativeBalance, tokenBalances] = await Promise.all([
    Moralis.EvmApi.account.getNativeBalance({ address, chain }),
    Moralis.EvmApi.account.getTokenBalances({ address, chain }),
  ]);
  res.status(200).json({
    // formatting the output
    nativeBalance: nativeBalance.result.balance.ether,
    tokenBalances: tokenBalances.result.map((token) => token.display()),
  });
}
