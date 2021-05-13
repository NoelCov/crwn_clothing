import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDJBIVOLmEkrb3wZcTeBbCMtNk2NXWLX88",
  authDomain: "crwn-db-5900e.firebaseapp.com",
  projectId: "crwn-db-5900e",
  storageBucket: "crwn-db-5900e.appspot.com",
  messagingSenderId: "220083537213",
  appId: "1:220083537213:web:499813e6478b156ec17154",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
