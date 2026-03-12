
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnOOBaV4RYBwANJExPhidlSpAnqVnlChs",
  authDomain: "ticketing-app-ff1be.firebaseapp.com",
  projectId: "ticketing-app-ff1be",
  storageBucket: "ticketing-app-ff1be.firebasestorage.app",
  messagingSenderId: "1000428939769",
  appId: "1:1000428939769:web:05ba0432d56797e5373528",
  measurementId: "G-SSSJDHNCYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);