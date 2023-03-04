import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyChf2ZZRSeSGPTudRBl9dw5WWstOD98F6A",
  authDomain: "hkr-286af.firebaseapp.com",
  projectId: "hkr-286af",
  storageBucket: "hkr-286af.appspot.com",
  messagingSenderId: "944752342475",
  appId: "1:944752342475:web:79e011deba3ecaaca1f24e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const app = !firebase.apps.length
//   ? firebase.initializeApp(firebaseConfig)
//   : firebase.app();

// const db = app.firestore();

export default db;
