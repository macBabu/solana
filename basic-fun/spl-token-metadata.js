const {
    getKeypairFromEnvironment,
    getExplorerLink,
  } = require("@solana-developers/helpers");
  const {
    Connection,
    clusterApiUrl,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
    Keypair
  } = require("@solana/web3.js");
  const fs = require("fs");
  const { createCreateMetadataAccountV3Instruction,createUpdateMetadataAccountV2Instruction } = require("@metaplex-foundation/mpl-token-metadata");



const connection = new Connection(clusterApiUrl("devnet"));
const payerSecretePath = fs.readFileSync("id.json", "utf-8");
const user = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(payerSecretePath)));


const main = async (isUpdate=false)=>{

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
  );


  const tokenMintAccount = new PublicKey("CJq99nbp8YvjZ4SfNtkATjCdAf1387NGnDevAJGZZrbf");

  const metadataData = {
    name: "NO KINGS & QUEENS 🚫👑", 
    symbol: "NKINGS",
    uri: "https://gateway.lighthouse.storage/ipfs/bafkreibsfr6wdm5mbxbzuwtldfd7ccgr4fwxnwm3ehnx7wfmyedbwwafyi",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
  };

  const metadataPDAAndBump = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      tokenMintAccount.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID,
  );
   

  const metadataPDA = metadataPDAAndBump[0];
 
const transaction = new Transaction();
let transactionSignature;

if(isUpdate){

    console.log("Updating metadata account");

    const updateMetadataInstruction = createUpdateMetadataAccountV2Instruction({
        metadata: metadataPDA,
        updateAuthority: user.publicKey,
      }, {
        updateMetadataAccountArgsV2: {
          data: metadataData,
          primarySaleHappened: false,
          isMutable: true,
          updateAuthority: user.publicKey,
        },
      });
      
      transaction.add(updateMetadataInstruction);
      
     transactionSignature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [user],
      );

}else{



const createMetadataAccountInstruction =
  createCreateMetadataAccountV3Instruction(
    {
      metadata: metadataPDA,
      mint: tokenMintAccount,
      mintAuthority: user.publicKey,
      payer: user.publicKey,
      updateAuthority: user.publicKey,
    },
    {
      createMetadataAccountArgsV3: {
        collectionDetails: null,
        data: metadataData,
        isMutable: true,
      },
    },
  );
 
transaction.add(createMetadataAccountInstruction);

 transactionSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [user],
  );



}
   
  const transactionLink = getExplorerLink(
    "transaction",
    transactionSignature,
    "devnet",
  );
   
  console.log(`✅ Transaction confirmed, explorer link is: ${transactionLink}!`);
   
  const tokenMintLink = getExplorerLink(
    "address",
    tokenMintAccount.toString(),
    "devnet",
  );
   
  console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);


}


main(true);