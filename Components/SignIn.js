import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

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

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        setWalletAddress(userData.wallet.address);
        setLoginStatus(true);
      } else {
        setWalletAddress("");
        setLoginStatus(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, db]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        window.location.href = "/portfolio";
      });
    } catch (e) {
      setError(e.message);
      alert(`Giriş başarısız: ${error.message}`);  // Registration failed

    }
  }

  const performLogout = async () => {
    await signOut(auth);
  }

  return (
<section class= "bg-white mx-auto max-w-screen py-32 lg:flex lg:h-screen justify-center lg:items-center">
            <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-black rounded-lg shadow-xl">
                <form class="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-black">Your email</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="ali@gatecon.app" />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-black ">Your password</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                    </div>
                    <button type="submit" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-black rounded-lg hover:bg-black-100 focus:ring-4 focus:ring-blue-300 sm:w-auto">Login to your account</button>
                    <div class="text-sm font-medium text-black">
                        Not registered yet? <a class="text-blue-700 hover:underline dark:text-blue-600">Create account</a>
                    </div>
                </form>
            </div>
</section>
  );
}

export default LoginPage;




