import { useConnection, useWallet,sendTransaction } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL,Transaction,PublicKey,SystemProgram } from "@solana/web3.js";
import { FC, useEffect, useState } from "react";
 
const Main = () => {
  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const sendSol = async event => {
    event.preventDefault();
   
    const transaction = new Transaction();
    const recipientPubKey = new PublicKey("EoWZ9p1piivk6x8J5qoJwdYoTVAXLyJKHy4z6Nt6JkCX");

    console.log('11111')
   
    const sendSolInstruction = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPubKey,
      lamports: 0.1 * LAMPORTS_PER_SOL,
    });

    console.log('222222')

    transaction.add(sendSolInstruction);
    const signature = sendTransaction(transaction, connection);
    console.log(signature);
  };
 
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
      console.log(info);
    });
  }, [connection, publicKey]);
 
  return (
    <div>
      <p>{publicKey ? `Balance: ${balance / LAMPORTS_PER_SOL} SOL` : ""}</p>

<div>
  <button style={{paddingInline:20,paddingBlock:6}} onClick={sendSol} >
    Send SOL
  </button>
</div>

    </div>
  );
};

export default Main;