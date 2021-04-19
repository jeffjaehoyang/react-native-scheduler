import firebase from "firebase/app";
import "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3_BVQaCU1XuBGJbHLl8oOhD2__xtOY4g",
  authDomain: "scheduler-da347.firebaseapp.com",
  databaseURL: "https://scheduler-da347-default-rtdb.firebaseio.com",
  projectId: "scheduler-da347",
  storageBucket: "scheduler-da347.appspot.com",
  messagingSenderId: "475960235028",
  appId: "1:475960235028:web:8d29d3a3099a8a8d12c301",
  measurementId: "G-BZE4RXBES6",
};

firebase.initializeApp(firebaseConfig);

export { firebase };
