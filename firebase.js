import firebase from "firebase";



const firebaseConfig = {
    apiKey: "AIzaSyClTunvtF1JEFWNit4u_eTpu04PFpRTWS0",
    authDomain: "clone-7747e.firebaseapp.com",
    projectId: "clone-7747e",
    storageBucket: "clone-7747e.appspot.com",
    messagingSenderId: "675010355037",
    appId: "1:675010355037:web:b9a08ce09517d5c7d5d2b4"
  };

const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();


  const db = app.firestore();
  export default db;