import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace these with your Firebase project config
// Get it from: https://console.firebase.google.com → Project Settings → Your apps → Web app
const firebaseConfig = {
  apiKey: import.meta.env.apiKey,
  authDomain: import.meta.env.authDomain,
  projectId: import.meta.env.projectId,
  storageBucket: import.meta.env.storageBucket,
  messagingSenderId: import.meta.env.messagingSenderId,
  appId: import.meta.env.appId,

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
