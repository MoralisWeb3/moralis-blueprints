const Ethereum = {
  hex: "0x1",
  name: "Ethereum",
  rpcUrl: "https://rpc.ankr.com/eth",
  ticker: "ETH",
};

const MumbaiTestnet = {
  hex: "0x13881",
  name: "Mumbai Testnet",
  rpcUrl: "https://rpc.ankr.com/polygon_mumbai",
  ticker: "MATIC",
};

export const CHAINS_CONFIG = {
  "0x1": Ethereum,
  "0x13881": MumbaiTestnet,
};
