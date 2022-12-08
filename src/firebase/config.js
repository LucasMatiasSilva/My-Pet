import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDHm_mMlJSiHckMo3RXP_XeWszGhUrku_4",
  authDomain: "atrio-acd03.firebaseapp.com",
  databaseURL: "https://atrio-acd03-default-rtdb.firebaseio.com",
  projectId: "atrio-acd03",
  storageBucket: "atrio-acd03.appspot.com", 
  messagingSenderId: "481267589229",
  appId: "1:481267589229:web:30733983d04935031f5f64",
  measurementId: "G-DTSCH7MECF"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.firestore()

export { firebase, database };