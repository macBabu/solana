const { createMint } = require("@solana/spl-token");
const {
  getExplorerLink,
} = require("@solana-developers/helpers");
const { Connection, clusterApiUrl,Keypair } = require("@solana/web3.js");
const fs = require("fs");


const connection = new Connection(clusterApiUrl("devnet"));
const payerSecretePath = fs.readFileSync("id.json", "utf-8");
const user = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(payerSecretePath)));


const mint = async ()=>{

    const tokenMint = await createMint(connection, user, user.publicKey, null, 2); // null is freeze authroity and 2 is decimal and user.publickey is mintAuthority
    const link = getExplorerLink("address", tokenMint.toString(), "devnet");
    console.log(`✅ Finished! Created token mint: ${link}`);

}

mint();