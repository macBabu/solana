const {
    getExplorerLink,
  } = require("@solana-developers/helpers");
  const {
    Connection,
    clusterApiUrl,
    PublicKey,
    Keypair
  } = require("@solana/web3.js");
  const fs = require("fs");
  const { getOrCreateAssociatedTokenAccount } = require("@solana/spl-token");
const { send } = require("process");

  const connection = new Connection(clusterApiUrl("devnet"));
  const payerSecretePath = fs.readFileSync("id.json", "utf-8");
  const user = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(payerSecretePath)));


  const main = async()=>{

const recipient = new PublicKey("mg8PQZ5yEaThs9TEGGsjsnsWtFxAC38jvSwZvAdXK7x");
const tokenMintAccount = new PublicKey("CJq99nbp8YvjZ4SfNtkATjCdAf1387NGnDevAJGZZrbf");
const sender = new PublicKey("99G4C7p2uwwcUs9nXcVpW8cg1Z8dW23mkt2dLpAmwQS7");
 
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);
 
console.log(`💸 Attempting to send 1 token to ${recipient.toBase58()}...`);

console.log(`Sender: `,sender);

 
// Get or create the source and destination token accounts to store this token
const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  sender.publicKey,
);

console.log(`Source Token Account: ${sourceTokenAccount.address.toBase58()}`);
 
const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  recipient.publicKey,
);

console.log(`Destination Token Account: ${destinationTokenAccount.address.toBase58()}`);
 
// Transfer the tokens
const signature = await transfer(
  connection,
  sender,
  sourceTokenAccount.address,
  destinationTokenAccount.address,
  sender,
  1 * MINOR_UNITS_PER_MAJOR_UNITS,
);
 
const explorerLink = getExplorerLink("transaction", signature, "devnet");
 
console.log(`✅ Transaction confirmed, explorer link is: ${explorerLink}!`);


  }

  main();