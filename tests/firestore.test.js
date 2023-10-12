const { db } = require('../firebase/firestore');
const { collection, addDoc, doc, getDoc, deleteDoc, setDoc } = require('firebase/firestore');
require('dotenv').config();

// Define a collection and document for testing
const testCollection = 'comments';
const testDocument = {
    title: "Ada",
    postDate: null
};

// test('should write and read data from Firestore', async () => {
//     // leer el documento de prueba

//     const docRef = await addDoc(collection(db, testCollection), testDocument);
//     const docSnapshot = await getDoc(docRef);

//     //verificar que la data existe
//     expect(docSnapshot.exists()).toBe(true);

//     // verificar que los datos coinciden
//     const data = docSnapshot.data();
//     console.log(data);
//     expect(data.title).toBe(testDocument.title);
//     expect(data.postDate).toBe(testDocument.postDate);
// });

describe('Firestore Tests', () => {
    let docRef;
    beforeAll(async () => {
        // agregar documento de prueba
        const collectionRef = collection(db, testCollection);
        docRef = await addDoc(collectionRef, testDocument);
        console.log(docRef);
    });

    it('should read data from Firestore', async () => {
        // leer el documento de prueba
        const docSnapshot = await getDoc(docRef);

        //verificar que la data existe
        expect(docSnapshot.exists()).toBe(true);

        // verificar que los datos coinciden
        const data = docSnapshot.data();
        console.log(data);
        expect(data.title).toBe(testDocument.title);
        expect(data.postDate).toBe(testDocument.postDate);
    });

    afterAll(async () => {
        // borrar el documento de prueba
        await deleteDoc(docRef);
    });
});
