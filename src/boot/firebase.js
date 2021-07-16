import { boot } from "quasar/wrappers";

console.log("firebase boot");

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBEWihEx3q5Vp09vi6WqFgg3paby5G2Gyk",
  authDomain: "servicapp-ae67a.firebaseapp.com",
  projectId: "servicapp-ae67a",
  storageBucket: "servicapp-ae67a.appspot.com",
  messagingSenderId: "633399295252",
  appId: "1:633399295252:web:963d6153bcb90b52bfd601",
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const marcaTiempo = firebase.firestore.FieldValue.serverTimestamp;

export { db, auth, marcaTiempo };

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
});
