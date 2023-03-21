import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
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
import { SiWireshark } from "react-icons/si";

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
const usersVansRef = collection(db, "usersVans");

export async function createAccount(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function loginUser(user) {
  const res = await signInWithEmailAndPassword(auth, user.email, user.password);
  return res;
}

export async function addUserVansDoc(user) {
  const userDoc = await addDoc(usersVansRef, {
    vans: [],
    user: user.email,
    uid: user.uid,
  });
  return userDoc;
}

export async function signUserOut() {
  signOut(auth).then(() => {
    localStorage.removeItem("user");
  }).catch;
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
  const q = query(usersVansRef, where("uid", "==", uid));
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

export async function getHostVans(hostId) {
  const q = query(usersVansRef, where("uid", "==", hostId));
  const querySnap = await getDocs(q);
  let vans = null;
  querySnap.forEach((doc) => {
    vans = doc.data().vans;
  });
  return vans;
}

export async function deleteVan(hostId, vanId) {
  const q = query(usersVansRef, where("uid", "==", hostId));
  const querySnap = await getDocs(q);
  let vans = null;
  let docId = null;
  querySnap.forEach((doc) => {
    docId = doc.id;
    vans = doc.data().vans;
  });
  vans = vans.filter((van) => van.id !== vanId);
  await updateDoc(doc(db, "usersVans", docId), { vans: vans });
}
