import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVxROeFuBQw3Aanm813O5xwf8XXiL2TD8",
  authDomain: "selfdevapp-7d102.firebaseapp.com",
  databaseURL: "https://selfdevapp-7d102-default-rtdb.firebaseio.com",
  projectId: "selfdevapp-7d102",
  storageBucket: "selfdevapp-7d102.appspot.com", // ✅ FIXED
  messagingSenderId: "575971184309",
  appId: "1:575971184309:web:f36dd72011abc8ab1738fc",
  measurementId: "G-66FTJH421J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
