const url = "https://ammora-giwa-sepolia-data.fly.dev/v1/tokens?chainId=91342";

const response = await fetch(url);

console.log("HTTP STATUS:", response.status);
console.log("HTTP OK:", response.ok);
console.log("CONTENT TYPE:", response.headers.get("content-type"));
console.log("RESPONSE BODY:");

const body = await response.text();
console.log(body.slice(0, 5000));
