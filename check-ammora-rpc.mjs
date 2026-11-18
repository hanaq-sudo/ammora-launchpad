import {
  createPublicClient,
  defineChain,
  http
} from "viem";

import {
  giwaSepoliaAutoRouteDeployment,
  verifyAmmoraV4CoreAtBlock,
  getAmmoraV4NextConfigId
} from "@ammora-protocol/sdk";

const deployment = giwaSepoliaAutoRouteDeployment;
const contracts = deployment.contracts.launch;

const chain = defineChain({
  id: deployment.chain.id,
  name: deployment.chain.name,
  nativeCurrency: deployment.chain.nativeCurrency,
  rpcUrls: {
    default: {
      http: deployment.chain.rpcUrls
    }
  }
});

const client = createPublicClient({
  chain,
  transport: http(deployment.chain.rpcUrls[0], {
    retryCount: 0
  })
});

console.log("Mengecek koneksi GIWA...");

const chainId = await client.getChainId();
console.log("Chain ID:", chainId);

if (chainId !== 91342) {
  throw new Error("Jaringan bukan GIWA Sepolia!");
}

const blockNumber = await client.getBlockNumber();
console.log("Block:", blockNumber.toString());

console.log("Memverifikasi kontrak Ammora...");

await verifyAmmoraV4CoreAtBlock(
  client,
  {
    configRegistry: contracts.configRegistry,
    launchFactory: contracts.factory,
    graduationAdapter: contracts.graduationAdapter,
    feePolicy: contracts.feePolicy
  },
  blockNumber
);

console.log("Verifikasi kontrak berhasil.");

const nextConfigId = await getAmmoraV4NextConfigId(
  client,
  contracts.configRegistry,
  blockNumber
);

console.log("Config terdaftar:", (nextConfigId - 1n).toString());
console.log("PEMERIKSAAN SELESAI");
