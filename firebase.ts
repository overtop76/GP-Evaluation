import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Sign in anonymously to access Firestore
signInAnonymously(auth).catch((error) => {
  console.error("Firebase Auth Error:", error);
  if (error.code === 'auth/admin-restricted-operation') {
    console.error("ACTION REQUIRED: You must enable 'Anonymous' sign-in provider in the Firebase Console (Authentication -> Sign-in method) for data syncing to work.");
  }
});
