import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

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

export async function createAccount(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}
