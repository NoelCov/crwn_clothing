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

export const AddCollectionAndDocuments = (collectionName, dataToAdd) => {
  const collectionRef = firestore.collection(collectionName);

  const batch = firestore.batch();
  dataToAdd.forEach((object) => {
    // Gets a new docRef for every object with a random generated unique ID
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, object);
  });

  batch.commit();
};

export const convertSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      title,
      items,
      route: encodeURI(title.toLowerCase()),
      id: doc.id,
    };
  });

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`/users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (e) {
      console.log("Error creating user", e.message);
    }
  }

  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
