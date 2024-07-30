const { Connection, clusterApiUrl,LAMPORTS_PER_SOL,PublicKey  } = require("@solana/web3.js");

let pubKey = new PublicKey("99G4C7p2uwwcUs9nXcVpW8cg1Z8dW23mkt2dLpAmwQS7");



const fetchBalance = async()=>{

    const connection = new Connection(clusterApiUrl("mainnet-beta"));
    let publicKey =  PublicKey.findProgramAddressSync(
        [Buffer.from("shaq.sol")],
        PublicKey.default
    );
    publicKey = publicKey[0];
    // pubKey = new PublicKey("99G4C7p2uwwcUs9nXcVpW8cg1Z8dW23mkt2dLpAmwQS7");
    console.log(publicKey);
let balance = await connection.getBalance(publicKey);
console.log(`The balance of the account is: ${balance/LAMPORTS_PER_SOL} SOL`);

}

fetchBalance();