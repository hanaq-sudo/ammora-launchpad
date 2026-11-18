import { createPublicClient, http } from "viem";
import {
  giwaSepoliaAutoRouteDeployment,
  getAmmoraV4ConfigAtBlock,
} from "@ammora-protocol/sdk";

const deployment = giwaSepoliaAutoRouteDeployment;

const client = createPublicClient({
  chain: {
    id: deployment.chain.id,
    name: deployment.chain.name,
    nativeCurrency: deployment.chain.nativeCurrency,
    rpcUrls: {
      default: { http: deployment.chain.rpcUrls },
    },
  },
  transport: http(deployment.chain.rpcUrls[0]),
});

const blockNumber = await client.getBlockNumber();

console.log("BLOCK:", blockNumber.toString());
console.log("REGISTRY:", deployment.contracts.launch.configRegistry);
console.log("MEMBACA CONFIG ID 56...");

try {
  const snapshot = await getAmmoraV4ConfigAtBlock(
    client,
    deployment.contracts.launch.configRegistry,
    56n,
    blockNumber
  );

  console.log("\nHASIL PEMERIKSAAN:");
  console.log("Config ID:", snapshot.configId.toString());
  console.log("Enabled:", snapshot.enabled);
  console.log("Owner:", snapshot.identity.owner);
  console.log("Fee Claimer:", snapshot.identity.feeClaimer);
  console.log("Created At Block:", snapshot.identity.createdAtBlock.toString());
  console.log("Config Hash:", snapshot.configHash);
  console.log("Pool Creation Fee:", snapshot.config.poolCreationFee.toString());
  console.log("Quote Token:", snapshot.config.quoteToken);
  console.log("Total Supply:", snapshot.config.totalSupply.toString());
  console.log("Token Decimals:", snapshot.config.tokenDecimals);
  console.log("Jumlah Segmen:", snapshot.segments.length);
  console.log("\nPARAMETER LENGKAP:");
  console.dir(snapshot.config, { depth: 5 });
  console.log("\nSEGMEN:");
  console.dir(snapshot.segments, { depth: 5 });
} catch (error) {
  console.error("GAGAL MEMBACA CONFIG:");
  console.error(error);
}
