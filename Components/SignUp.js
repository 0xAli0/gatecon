import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import React, { useState } from 'react';
import { redirect } from 'next/dist/server/api-utils';

// Firebase configuration here
// Your Firebase configuration
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

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleTermsChange = (event) => {
      setTermsAccepted(event.target.checked);
    };
  
    const onSubmit = async (event) => {
      event.preventDefault();

      if (!termsAccepted) {
        alert('Please accept the terms and conditions before submitting.');
        return;
      }
  
      const wallet = await DirectSecp256k1HdWallet.generate(12, {prefix: 'juno'});
      const [firstAccount] = await wallet.getAccounts();
  
      const userData = {
        username: username,
        email: email,
        wallet: {
          address: firstAccount.address,
          mnemonic: wallet.mnemonic,
        },
      };
  
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
      
        await setDoc(doc(db, 'users', userId), userData);
      
        // 1 saniye bekleyip /signin sayfasına yönlendirme
        setTimeout(() => {
          window.location.href = "/signin";
        });
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          alert('Bu email adresi zaten kullanımda.');  // This email is already in use
        } else {
          alert(`Kayıt başarısız: ${error.message}`);  // Registration failed
        }
      }
    }

    return (
      <section class= "bg-white mx-auto max-w-screen py-32 lg:flex lg:h-screen justify-center lg:items-center">
        <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl ">
          <form onSubmit={onSubmit} class="space-y-6">
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-black">Your username</label>
              <input 
                type="username" 
                name="username" 
                id="username"  
                required 
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                placeholder="ali" 
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input 
                type="email" 
                name="email" 
                id="email"  
                required 
                class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="ali@gatecon.app" 
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-black">Your password</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                required 
                placeholder="•••••••••••" 
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div class="flex items-start mb-6">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  checked={termsAccepted}
                  onChange={handleTermsChange}
                  required
                />
              </div>
              <label for="terms" class="ml-2 text-sm font-medium text-gray-900 ">
                I agree with the <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" class="text-blue-600 hover:underline">terms and conditions</a>
              </label>
            </div>
            <button type="submit" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-black rounded-lg hover:bg-black-100 focus:ring-4 focus:ring-blue-300 sm:w-auto">Sign up to app</button>
          </form>
        </div>
      </section>
    )
}

export default SignUp
