import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const RPC_URL = process.env.RPC_URL || "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

// const graphitetestnet = {
//   id: 54170,
//   name: "Graphite Testnet",
//  rpcUrl: {
//   default :{ http : ['https://anon-entrypoint-test-1.atgraphite.com']}
//  },
// };

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    graphite: {
      url: RPC_URL,
      accounts: ["ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"],
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

export default config;
