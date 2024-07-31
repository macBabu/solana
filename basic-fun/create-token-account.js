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

  const connection = new Connection(clusterApiUrl("devnet"));
  const payerSecretePath = fs.readFileSync("id.json", "utf-8");
  const user = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(payerSecretePath)));

  
  const main = async()=>{

    const tokenMintAccount = new PublicKey("CJq99nbp8YvjZ4SfNtkATjCdAf1387NGnDevAJGZZrbf");
    const recipient = user.publicKey;

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        user,
        tokenMintAccount,
        recipient,
      );
       
      console.log(`Token Account: ${tokenAccount.address.toBase58()}`);
       
      const link = getExplorerLink(
        "address",
        tokenAccount.address.toBase58(),
        "devnet",
      );
       
      console.log(`✅ Created token Account: ${link}`);


  };


  main();

