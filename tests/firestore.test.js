const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, doc, getDoc, deleteDoc, setDoc } = require('firebase/firestore');
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Define a collection and document for testing
const testCollection = 'comments';
const testDocument = {
    title: "Ada",
    postDate: null
};
const testId = "Prueba";

describe('Firestore Tests', () => {
    beforeAll(async () => {
        // agregar documento de prueba
        await setDoc(doc(db, testCollection, testId), testDocument);

    });

    afterAll(async () => {
        // borrar el documento de prueba
        const docRef = doc(collection(db, testCollection), testId);

        await deleteDoc(docRef);
    });

    it('should write and read data from Firestore', async () => {
        // leer el documento de prueba
        const docRef = await addDoc(collection(db, testCollection), testDocument);
        const docSnapshot = await getDoc(docRef);

        //verificar que la data existe
        expect(docSnapshot.exists()).toBe(true);

        // verificar que los datos coinciden
        const data = docSnapshot.data();
        expect(data.title).toBe(testDocument.title);
        expect(data.postDate).toBe(testDocument.postDate);
    });



});
