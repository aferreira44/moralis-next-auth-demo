import Moralis from "moralis";
const { EvmChain } = require("@moralisweb3/evm-utils");

function Native({ nativeBalance, address }) {
  return (
    <div>
      <h3>Wallet: {address}</h3>
      <h3>Native Balance: {nativeBalance} ETH</h3>
    </div>
  );
}

export async function getServerSideProps(context) {
  // reads the api key from .env.local and starts Moralis SDK
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  const address = process.env.ADDRESS
  const chain = EvmChain.MUMBAI;

  const nativeBalance = await Moralis.EvmApi.account.getNativeBalance({
    address,
    chain
  });

  return {
    props: {
      address,
      // Return the native balance formatted in ether via the .ether getter
      nativeBalance: nativeBalance.result.balance.ether,
    },
  };
}

export default Native;
