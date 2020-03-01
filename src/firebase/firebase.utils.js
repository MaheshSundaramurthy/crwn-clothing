import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBYViEBdNlw7iS9anHLOQMIQuPecdr0Nt4",
  authDomain: "crwn-db-2537c.firebaseapp.com",
  databaseURL: "https://crwn-db-2537c.firebaseio.com",
  projectId: "crwn-db-2537c",
  storageBucket: "crwn-db-2537c.appspot.com",
  messagingSenderId: "816672534432",
  appId: "1:816672534432:web:dd73ab07a1ef510c50fec5"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
