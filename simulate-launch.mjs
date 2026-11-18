import { createPublicClient, http } from "viem";
import {
  giwaSepoliaAutoRouteDeployment,
  ammoraLaunchFactoryV4Abi
} from "@ammora-protocol/sdk";

const account = "0x9A63842baD732FD1D796488dDcCa6dda1337c69d";
const deployment = giwaSepoliaAutoRouteDeployment;
const factory = deployment.contracts.launch.factory;

const client = createPublicClient({
  transport: http("https://sepolia-rpc.giwa.io")
});

console.log("Memeriksa wallet dan jaringan...");

const chainId = await client.getChainId();
if (chainId !== 91342) throw new Error(`Chain ID salah: ${chainId}`);

console.log("Wallet:", account);
console.log("Factory:", factory);
console.log("Config ID: 56");
console.log("Menjalankan simulasi createLaunch...");

try {
  const result = await client.simulateContract({
    account,
    address: factory,
    abi: ammoraLaunchFactoryV4Abi,
    functionName: "createLaunch",
    args: [
      "Ammora Test Token",
      "ATT",
      "ipfs://bafybeigdyrzt-placeholder/metadata.json",
      56n
    ],
    value: 0n
  });

  console.log("\nSIMULASI BERHASIL");
  console.log("Token prediksi:", result.result[0]);
  console.log("Curve prediksi:", result.result[1]);
  console.log("Status: createLaunch dapat dieksekusi pada state saat ini.");
} catch (error) {
  console.log("\nSIMULASI GAGAL");
  console.log(error.shortMessage || error.message);
  if (error.cause?.shortMessage) console.log("Detail:", error.cause.shortMessage);
}
