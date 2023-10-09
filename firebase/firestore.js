const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore, collection, addDoc, doc, getDoc, deleteDoc, setDoc, getDocs } = require('firebase/firestore');
require('dotenv').config();

let instance;
class Firebase {
    constructor() {
        if (instance) {
            throw new Error("Only one instace of Firebase can exists at a time")
        }
        instance = this;
        this.config = {
            apiKey: process.env.EXPO_PUBLIC_API_KEY,
            authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
            projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
            storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
            messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
            appId: process.env.EXPO_PUBLIC_APP_ID,
            measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID
        };

        this.firebaseApp = initializeApp(this.config);
        this.db = getFirestore(this.firebaseApp);
        this.auth = getAuth(this.firebaseApp);
    }

    static getInstance() {
        if (!instance) {
            instance = new Firebase(); // Create a new instance if it doesn't exist
        } else {
            console.log("Firebase instance already exists");
        }
        return instance;
    }

}
const firebase = Firebase.getInstance();
const db = firebase.db;
const auth = firebase.auth;

module.exports = { db, auth };