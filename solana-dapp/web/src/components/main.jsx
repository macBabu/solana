import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL,Transaction,PublicKey,SystemProgram,TransactionInstruction  } from "@solana/web3.js";
import { FC, useEffect, useState } from "react";
import { createMint } from "@solana/spl-token";


const Main = () => {
  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey,sendTransaction } = useWallet();
  const [txHash, setTxHash] = useState(null);

  const sendSol = async () => {
    try{
   
    const transaction = new Transaction();
    const recipientPubKey = new PublicKey("EoWZ9p1piivk6x8J5qoJwdYoTVAXLyJKHy4z6Nt6JkCX");
   
    const sendSolInstruction = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPubKey,
      lamports: 0.1 * LAMPORTS_PER_SOL,
    });

    transaction.add(sendSolInstruction);

      
      const signature = await sendTransaction(transaction, connection);
      setTxHash(signature);
      console.log(signature);

    }catch(e){
      console.log('Error:',e);
    }

  };

  const pingId = async ()=>{

    try{

      const transaction = new Transaction();
      const pingProgramId = new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
      const pingProgramDataId = new PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");

      const instruction = new TransactionInstruction({
        programId: pingProgramId,
        keys: [{pubkey:pingProgramDataId,isSigner:false,isWritable:true}]
      })

      transaction.add(instruction);

      const signature = await sendTransaction(transaction,connection);
      setTxHash(signature);
      console.log(signature);

    }catch(e){
      console.log('Error:',e);
    }

  }

  const mintToken = async ()=>{
    const mint = new PublicKey("EoWZ9p1piivk6x8J5qoJwdYoTVAXLyJKHy4z6Nt6JkCX");

    const mintState = await token.getMint(connection, mint);
    console.log(mintState);
  const accountKeypair = await web3.Keypair.generate();
  const space = token.getAccountLenForMint(mintState);
  console.log(space);


  }
 
  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }
 
    connection.onAccountChange(
      publicKey,
      updatedAccountInfo => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      "confirmed",
    );
 
    connection.getAccountInfo(publicKey).then(info => {
      setBalance(info.lamports);
    });
  }, [connection, publicKey]);
 
  return (
    <div>
      <p>{publicKey ? `Balance: ${(balance / LAMPORTS_PER_SOL).toFixed(4)} SOL` : ""}</p>

<div>
  <button style={{paddingInline:20,paddingBlock:6,marginBottom:20}} onClick={()=>sendSol()} >
    Send SOL
  </button>
</div>

<div>
  <button style={{paddingInline:20,paddingBlock:6}} onClick={pingId}  >
    PING ID
  </button>
</div>

<div>
  <button style={{paddingInline:20,paddingBlock:6,marginTop:20}} onClick={mintToken}  >
   MINT TOKEN
  </button>
</div>


      {
        txHash && 
        <a href={`https://explorer.solana.com/tx/${txHash}?cluster=devnet`} target="_blank" rel="noreferrer">
          View Transaction
        </a>
      }

    </div>
  );
};

export default Main;