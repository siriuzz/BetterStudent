const express = require('express');
const app = express();
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerDocument = require('./swagger-output.json');

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://your-project-id.firebaseio.com', // Replace with your Firebase project URL
// });

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, doc, getDoc, getDocs, deleteDoc, setDoc } = require('firebase/firestore');

// const firebaseConfig = {
//     apiKey: process.env.EXPO_PUBLIC_API_KEY,
//     authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
//     projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
//     storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
//     messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
//     appId: process.env.EXPO_PUBLIC_APP_ID,
//     measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID
// };

admin.initializeApp({
    credential: admin.credential.cert(require('./serviceAccount.json')),
    databaseURL: `https://${process.env.EXPO_PUBLIC_PROJECT_ID}-default-rtdb.firebaseio.com`, // Replace with your Firebase project URL
});
// const db = getFirestore(firebaseApp);
const db = admin.firestore();


router.get('/', (req, res) => {
    res.send('Hello World!');
});
//Students works
router.get('/Students', async (req, res) => {
    const studentCollection = db.collection('students');
    const querySnapshot = await studentCollection.get(studentCollection);

    const students = [];
    querySnapshot.forEach((doc) => {
        students.push(doc.data());
    });
    // if (docSnap.exists()) {
    //     res.send(docSnap.data());
    // }
    console.log('Fetched students:', students);
    res.send(students);
}).post('/Students', async (req, res) => {
    try {
        const studentCollection = db.collection('students');
        const docRef = await studentCollection.add(req.body);
        res.send(docRef.id); //this is working
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});