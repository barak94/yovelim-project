// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore'
import { v4 } from 'uuid';
import { async } from "@firebase/util";

const firebaseConfig = {
  apiKey: "AIzaSyDa-0hsJHAPlK3BbsnbJUk5IRJuhea_v7I",
  authDomain: "test-1-9bda5.firebaseapp.com",
  projectId: "test-1-9bda5",
  storageBucket: "test-1-9bda5.appspot.com",
  messagingSenderId: "864569591523",
  appId: "1:864569591523:web:a4ebc8ea592205628527d6"
};

bbbbb

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const auth = getAuth(app);

export const db = getFirestore(app)

export const creatAuthUserWithEmailAndPassword = async (email, password) => {

  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const createUser = async (user, userInfo) => {

  if (!userInfo || !user) return;

  const userDocRef = doc(db, 'users', user.uid);
  const getUserFromDB = await getDoc(userDocRef);

  if (!getUserFromDB.exists()) {

    const date = new Date();

    try {

      await setDoc(userDocRef, { ...userInfo, date });

    } catch (error) {

      console.error(error.message);

    }

  }

}

export const createDoc = async (docInfo, collectionName) => {

  const docRef = doc(db, collectionName, v4());
  const getDocFromDB = await getDoc(docRef);

  if (!getDocFromDB.exists()) {

    const date = new Date();

    try {

      await setDoc(docRef, { ...docInfo, date });

    } catch (error) {

      console.error(error.message);

    }
  }

}

export const deleteDocRef = async (collectionName, docId) => {

  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);

}

export const getCollection = async (collectionName) => {

  const collectionRef = collection(db, collectionName);

  const allDocs = await getDocs(collectionRef)

  const a = allDocs.docs.map((doc) => { return { ...doc.data(), id: doc.id } });

  return a;
}


export const logInWithEmailAndPassword = async (email, password) => {

  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const deleteAuthUser = async (userInfo, currentUser) => {
  if (!userInfo || !currentUser) return;

  await logInWithEmailAndPassword(userInfo.email, userInfo.password);
  await deleteUser(auth.currentUser);
  await deleteDocRef('users', userInfo.id);
  await logInWithEmailAndPassword(currentUser.email, currentUser.password);

}

export const signOutUser = async () =>
  await signOut(auth);

export const userAuthLisiner = (callback) => {
  if (!callback) return;

  return onAuthStateChanged(auth, callback);

}

export const addToStorage = async (file) => {

  if (!file) return;

  const url = `images/${file.name}`;

  const storageRef = ref(storage, url);

  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });

}

export const getDocByName = async (collectionName, docName) => {

  const docRef = doc(db, collectionName,docName);

  return await getDoc(docRef);

}