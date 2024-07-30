const fs = require("fs");
const web3 = require("@solana/web3.js");
const {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");
const { airdropIfRequired } = require("@solana-developers/helpers");

const secretKey = JSON.parse(fs.readFileSync('id.json', "utf-8"));
let senderKeyPair = Keypair.fromSecretKey(Uint8Array.from(secretKey));
console.log(`The public key is: `, senderKeyPair.publicKey.toBase58());
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

const main = async () => {


  const newBalance = await airdropIfRequired(
    connection,
    senderKeyPair.publicKey,
    2 * LAMPORTS_PER_SOL,
    5 * LAMPORTS_PER_SOL
  );

  console.log(`The new balance is: ${newBalance / LAMPORTS_PER_SOL} SOL`);

  const PING_PROGRAM_ADDRESS = new PublicKey(
    "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa",
  );
  const PING_PROGRAM_DATA_ADDRESS = new PublicKey(
    "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod",
  );

  const transaction = new Transaction();
  const programId = new PublicKey(PING_PROGRAM_ADDRESS);
  const pingProgramDataId = new PublicKey(PING_PROGRAM_DATA_ADDRESS);

  const instruction = new web3.TransactionInstruction({
    programId: programId,
    keys: [{ pubkey: pingProgramDataId, isSigner: false, isWritable: true }],
  })

    transaction.add(instruction);

    const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [senderKeyPair]
    )

    console.log(`✅ Transaction completed! Signature is ${signature}`);


};

main();
