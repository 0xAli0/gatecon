import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import QRCodeGenerator from './QrCode';
import { CosmWasmClient, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice } from '@cosmjs/stargate';

const firebaseConfig = {
  apiKey: "AIzaSyBd4e4QXp_uQkV8wfGxfBfbZhUh6QkE7rg",
  authDomain: "gatecon-fb49e.firebaseapp.com",
  projectId: "gatecon-fb49e",
  storageBucket: "gatecon-fb49e.appspot.com",
  messagingSenderId: "255306442817",
  appId: "1:255306442817:web:6b572548a833c74266fec0",
  measurementId: "G-5Q1T7YRQEG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function Portfolio() {
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");
  const [loginStatus, setLoginStatus] = useState(true);
  const [data, setData] = useState("0");
  const [balance, setBalance] = useState("0");
  const [txAddess, setTxAddress] = useState("");
  const [txAmount, setTxAmount] = useState("");
  const [memmo, setMemmo] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        setWalletAddress(userData.wallet.address);
        setMemmo(userData.wallet.mnemonic);
        setLoginStatus(true);
      } else {
        setWalletAddress("");
        setLoginStatus(false);
        setTimeout(() => {
          window.location.href = "/";
        },1000);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, db]);


  const performLogout = async () => {
    await signOut(auth);
  }
  useEffect(() => {
    if (!walletAddress) return;

    const getBalance = async () => {

      const client = await CosmWasmClient.connect('https://juno-rpc.polkachu.com/', )

      setInterval(async( )  => {
        client.getBalance(walletAddress, 'ujuno').then((data) => {
          setBalance(data.amount/1000000)
        })

        client.queryContractSmart(
          'juno1e6d7ac4340cqqspj60lm63tjsst9lsm6zg3zzftfudvca95gatts3t0zyt',
          {
            balance: {
              address: walletAddress,
        }
          }
        ).then((data) => {
          setData(data.balance/100)
        })
      }, 1000)
    }
    getBalance();
    }, [walletAddress]);

  const addressOnchange = (e) => {
    setTxAddress(e.target.value);
  }
  const amountOnchange = (e) => {
    setTxAmount(e.target.value);
  }

  const sendTokens = async () => {
    console.log(memmo);
    const signer = await DirectSecp256k1HdWallet.fromMnemonic(
      memmo, {prefix: 'juno'})
    const client = await SigningCosmWasmClient.connectWithSigner('https://juno-rpc.polkachu.com/', signer, {
      gasPrice: GasPrice.fromString('0.025ujuno'),
    } )

    await client.sendTokens(walletAddress, txAddess, [{denom: 'ujuno', amount: txAmount*100000000}],"auto")
  }



  return (
<section className= "bg-white flex mx-auto max-w-screen py-32 lg:flex lg:h-screen justify-center lg:items-center">

            <div>
              <div className="text-black">
              <QRCodeGenerator value={walletAddress} />
                {error && <p>{error}</p>}
                {loginStatus ? <div>{walletAddress}</div> : <div>Logged out.</div>}
                <br></br>

                <p>GTC Balance:{data}</p>
                <p>JUNE Balance:{balance}</p>
              </div>
              <br></br>

            <div>
              <input type="text" placeholder="address" className='text-black' onChange={addressOnchange}value={txAddess}/>
                  <br></br>
              <input type="text" placeholder="amount" className='text-black' onChange={amountOnchange} value={txAmount}/>

                <button onClick={sendTokens} type="button" class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Sent transaction</button>
              </div>
              <br></br>

              <div className='text-black'>
                    <button onClick={performLogout} type="button" class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Log out</button>
              </div>
            </div>
</section>

  );
}

export default Portfolio;




