import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

// Replace this with your Firebase SDK config snippet
const firebaseConfig = {
    apiKey: "AIzaSyDFZP2FaWgyw2dP6ROJ-lHOIV0Cie6J63U",
    authDomain: "tester-of2020.firebaseapp.com",
    databaseURL: "https://tester-of2020-default-rtdb.firebaseio.com",
    projectId: "tester-of2020",
    storageBucket: "tester-of2020.appspot.com",
    messagingSenderId: "1041975985573",
    appId: "1:1041975985573:web:223482505adb2d70cbd44c",
    measurementId: "G-793Z71QZ6J"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };