// lib/firebase-config.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, deleteDoc,onSnapshot } from 'firebase/firestore'; // Add Firestore functions

const firebaseConfig = {
  apiKey: "AIzaSyAuuoN1phtfbGsPekGwh0kPgdBsYnZQfT4",
  authDomain: "sindhhealthcarecommission.firebaseapp.com",
  projectId: "sindhhealthcarecommission",
  storageBucket: "sindhhealthcarecommission.firebasestorage.app",
  messagingSenderId: "604637992516",
  appId: "1:604637992516:web:c1e24967c471a156628e11",
  measurementId: "G-ZJSR5G58HP"
  
};

// Initialize Firebase if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get Auth and Firestore instances
const auth = getAuth(app);
const firestore = getFirestore(app);

// Export Firebase services
export {
  app,
  auth,
  firestore,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  collection, // Export Firestore functions
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
};