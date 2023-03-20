import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  query,
  where,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBG8DcAJfveRYlkUlAgLVNnU-WIwBLxCnk",
  authDomain: "vanlife-b3279.firebaseapp.com",
  projectId: "vanlife-b3279",
  storageBucket: "vanlife-b3279.appspot.com",
  messagingSenderId: "169599472113",
  appId: "1:169599472113:web:a33a14dac9be261db0f450",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore();
const vansCollectionRef = collection(db, "vans");
const usersVansCollRef = collection(db, "usersVans");

export async function createAccount(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function loginUser(user) {
  const res = await signInWithEmailAndPassword(auth, user.email, user.password);
  return res;
}

export async function addUserVansDoc(user) {
  const userDoc = await addDoc(usersVansCollRef, {
    vans: [],
    user: user.email,
    uid: user.uid,
  });
  return userDoc;
}

export async function getVans() {
  const querySnapshot = await getDocs(vansCollectionRef);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const snapshot = await getDoc(docRef);
  return {
    ...snapshot.data(),
    id: snapshot.id,
  };
}

export async function rentVan(van, uid) {
  const q = query(usersVansCollRef, where("uid", "==", uid));
  const querySnap = await getDocs(q);
  let id = null;
  let vanExests = false;
  let data = null;
  querySnap.forEach((doc) => {
    data = doc.data();
    id = doc.id;
    for (let ele of doc.data().vans) {
      if (ele.id == van.id) {
        console.log("van already exists");
        vanExests = true;
      }
    }
  });
  if (vanExests) {
    return true;
  }
  console.log("adding van");
  const docRef = doc(db, "usersVans", id);
  await updateDoc(docRef, {
    ...data,
    vans: [...data.vans, van],
  });
  return false;
}
