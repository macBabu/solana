const os = require("os");
const path = require("path");
const fs = require("fs");
const {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const keypairPath = path.join(os.homedir(), ".config", "solana", "id.json");
const secretKey = JSON.parse(fs.readFileSync(keypairPath, "utf-8"));

// my address: 99G4C7p2uwwcUs9nXcVpW8cg1Z8dW23mkt2dLpAmwQS7
// sending to : 99G4C7p2uwwcUs9nXVVpW8cg1Z8dW23mkt2dLpAmwQS7

const sendSol = async () => {
  let senderKeyPair = Keypair.fromSecretKey(Uint8Array.from(secretKey));
  let receiver = new PublicKey("99G4C7p2uwwcUs9nXVVpW8cg1Z8dW23mkt2dLpAmwQS7");

  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
  );

  const transaction = new Transaction();
  const SOL_TO_SEND = 0.5;

  const sendTransaction = SystemProgram.transfer({
    fromPubkey: senderKeyPair.publicKey,
    toPubkey: receiver,
    lamports: LAMPORTS_PER_SOL * SOL_TO_SEND,
  });

  transaction.add(sendTransaction);

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeyPair,
  ]);
  console.log(`Transaction sent. Signature: ${signature}`);
  console.log(`✅ Finished!`);
};

// sendSol();
