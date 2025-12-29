// Firebase setup
const firebaseConfig = {
    apiKey: "AIzaSyDXp_059WCCno1yZdq4d8WowJpDpk8sESE",
    authDomain: "quiz-6b7c4.firebaseapp.com",
    projectId: "quiz-6b7c4",
    storageBucket: "quiz-6b7c4.firebasestorage.app",
    messagingSenderId: "640918865502",
    appId: "1:640918865502:web:5ba31d97ecb21d155696cf",
    measurementId: "G-B6BD8C79Z0"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

window.auth = auth;
window.db = db;
window.storage = storage;
