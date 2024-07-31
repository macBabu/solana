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
  const { mintTo } = require("@solana/spl-token");

  const connection = new Connection(clusterApiUrl("devnet"));
  const payerSecretePath = fs.readFileSync("id.json", "utf-8");
  const user = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(payerSecretePath)));



  const main = async()=>{

  const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);
  const tokenMintAccount = new PublicKey("CJq99nbp8YvjZ4SfNtkATjCdAf1387NGnDevAJGZZrbf");

    const recipientAssociatedTokenAccount = new PublicKey(
        "8uiyTU7MaYJHbVHjrSGAtgQjnCuyPJjTeSJVRfYCzUaA",
      );

      const transactionSignature = await mintTo(
        connection,
        user,
        tokenMintAccount,
        recipientAssociatedTokenAccount,
        user,
        10 * MINOR_UNITS_PER_MAJOR_UNITS,
      );
       
      const link = getExplorerLink("transaction", transactionSignature, "devnet");
       
      console.log(`✅ Success! Mint Token Transaction: ${link}`);

  }


    main();