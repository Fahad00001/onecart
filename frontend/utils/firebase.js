import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-fcbfb.firebaseapp.com",
  projectId: "loginonecart-fcbfb",
  storageBucket: "loginonecart-fcbfb.firebasestorage.app",
  messagingSenderId: "403331602129",
  appId: "1:403331602129:web:31a3426dd67a1006ad57f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
