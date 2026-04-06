import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCimcn_AIdabTPHPf8Z0-xMPHIJumpbxPk",
  authDomain: "connectlabkaist.firebaseapp.com",
  projectId: "connectlabkaist",
  storageBucket: "connectlabkaist.firebasestorage.app",
  messagingSenderId: "756631164879",
  appId: "1:756631164879:web:331c22f112f74a4991a4ba"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
