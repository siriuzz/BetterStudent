const controllers = require('../firebase/controllers');
const db = require('../firebase/firestore');
const { getFirestore, collection, addDoc, doc, getDoc, deleteDoc, setDoc } = require('firebase/firestore');

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
