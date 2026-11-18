import { createPublicClient, http } from "viem";
import { giwaSepoliaAutoRouteDeployment, ammoraLaunchConfigRegistryV4Abi } from "@ammora-protocol/sdk";

const client = createPublicClient({
  transport: http("https://sepolia-rpc.giwa.io")
});

const registry = giwaSepoliaAutoRouteDeployment.contracts.launch.configRegistry;

const [chainId, owner, pendingOwner, enabled, nextId] = await Promise.all([
  client.getChainId(),
  client.readContract({ address: registry, abi: ammoraLaunchConfigRegistryV4Abi, functionName: "owner" }),
  client.readContract({ address: registry, abi: ammoraLaunchConfigRegistryV4Abi, functionName: "pendingOwner" }),
  client.readContract({ address: registry, abi: ammoraLaunchConfigRegistryV4Abi, functionName: "enabled", args: [56n] }),
  client.readContract({ address: registry, abi: ammoraLaunchConfigRegistryV4Abi, functionName: "nextConfigId" })
]);

console.log({ chainId, registry, owner, pendingOwner, config56Enabled: enabled, nextConfigId: nextId.toString() });
