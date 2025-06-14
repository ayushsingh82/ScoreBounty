import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const RPC_URL = process.env.RPC_URL || "";

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
      accounts: [""],
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
