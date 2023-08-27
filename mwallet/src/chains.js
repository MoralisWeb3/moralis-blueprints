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

const GoerliTestnet = {
  hex: "0x5",
  name: "Goerli Testnet",
  rpcUrl: "https://rpc.ankr.com/eth_goerli",
  ticker: "GTH",
};

const Polygon = {
  hex: "0x89",
  name: "Polygon",
  rpcUrl: "https://rpc.ankr.com/polygon",
  ticker: "MATIC",
};

const Avalanche = {
  hex: "0xa86a",
  name: "Avalanche",
  rpcUrl: "https://rpc.ankr.com/avalanche",
  ticker: "AVAX",
};

export const CHAINS_CONFIG = {
  "0x1": Ethereum,
  "0x13881": MumbaiTestnet,
  "0x5": GoerliTestnet,
  "0x89": Polygon,
  "0xa86a": Avalanche,
};
