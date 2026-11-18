import { AmmoraDataApiClient } from "@ammora-protocol/sdk";

const data = new AmmoraDataApiClient(
  "https://ammora-giwa-sepolia-data.fly.dev"
);

const launches = await data.getLaunches({
  chainId: 91342n
});

console.log("HASIL DATA API:");
console.dir(launches, { depth: 5 });
