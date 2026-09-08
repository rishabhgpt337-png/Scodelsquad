import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyA-mock-key-mock-key-mock-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "mock-domain.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mock-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "mock-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:000000000000:web:0000000000000000",
};

// Initialize Firebase safely for Next.js SSR / client environments
const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(firebaseApp);

export async function signInWithGoogle() {
  const { signInWithPopup, signInWithRedirect } = await import("firebase/auth");
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error: any) {
    if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
      return await signInWithRedirect(auth, googleProvider);
    }
    throw error;
  }
}

export async function signOutUser() {
  const { signOut } = await import("firebase/auth");
  return signOut(auth);
}

export default firebaseApp;
