// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, onAuthStateChanged, signOut
} from "firebase/auth";
import { writable } from 'svelte/store';
export let user = writable(null);
import { goto } from '$app/navigation';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyBxaU4mUKgQFFanwwusulkC7Hk8R1qUDC4",

  authDomain: "teste-c09fe.firebaseapp.com",

  projectId: "teste-c09fe",

  storageBucket: "teste-c09fe.appspot.com",

  messagingSenderId: "27705592203",

  appId: "1:27705592203:web:9b2459181202bf2761478e"

};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const authLogoff = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    goto('/')
  }).catch((error) => {
    // An error happened.
  });
}
const authEmailSenha = async (email, senha) => {
  signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      // Signed in
      user.set(userCredential.user);
      // ...
      console.log(user);
      goto('/sessoes')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

const authCriarEmailSenha = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      user.set(userCredential.user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

const authGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      user.set(result.user);
      goto('/sessoes')
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

const recuperarSenha = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
      console.log(email)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
onAuthStateChanged(auth, (newUser) => {
  if (newUser) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = newUser.uid;
    console.log("usuario logado func")
    user.set(newUser);
    // ...
  } else {
    // User is signed out
    // ...
    user.set(null);
    console.log("usuario deslogado func")
  }
});

export const loginEmailSenha = authEmailSenha;
export const createUserEmailSenha = authCriarEmailSenha;
export const loginGoogle = authGoogle;
export const passwordRecover = recuperarSenha;
export const userLogout = authLogoff;
