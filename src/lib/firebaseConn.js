// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, onAuthStateChanged, signOut
} from "firebase/auth";
import { writable } from 'svelte/store';

export let user= writable(null);
import { goto } from '$app/navigation';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChvdCHDZ1-f09t1xlTtmIKhOGELzWEe0I",
  authDomain: "authenticationkaio.firebaseapp.com",
  projectId: "authenticationkaio",
  storageBucket: "authenticationkaio.appspot.com",
  messagingSenderId: "453096558982",
  appId: "1:453096558982:web:0fa3ee87e8535585c7dc07"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
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
