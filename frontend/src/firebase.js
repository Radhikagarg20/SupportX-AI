import { initializeApp }
from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyBWsx0K1u-5WQKeYRbmHVQ4h5A1YHPabtY",

  authDomain:
    "tough-country-383813.firebaseapp.com",

  projectId:
    "tough-country-383813",

  storageBucket:
    "tough-country-383813.firebasestorage.app",

  messagingSenderId:
    "181894593388",

  appId:
    "1:181894593388:web:55f92c2f39105e064e1149"

};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const provider =
  new GoogleAuthProvider();