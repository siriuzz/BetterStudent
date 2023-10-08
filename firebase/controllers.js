const { collection, addDoc, doc, getDoc, deleteDoc, setDoc, getDocs } = require('firebase/firestore');
const models = require('./models');

class StudentController {
    constructor(database) {
        this.db = database;
    }
    async getAllStudents() {
        try {
            const collectionRef = collection(this.db, 'students');
            const querySnapshot = await getDocs(collectionRef);
            const documents = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.data);
                documents.push(doc.data());
            });
            return documents;
        } catch (error) {
            console.error('Error getting documents:', error);
            throw error;
        }
    }

    async getStudentById(id) {
        try {
            const docRef = doc(this.db, 'students', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log('No such document!');
                return null;
            }
        } catch (error) {
            console.error('Error getting document:', error);
            throw error;
        }
    }

    async getStudentByEmail(email) {
        try {
            const docRef = doc(this.db, 'students', email);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log('No such document!');
                return null;
            }
        } catch (error) {
            console.error('Error getting document:', error);
            throw error;
        }
    }

    async addStudent(student) {
        const newStudent = new models.Student(student.name, student.email, student.phone_number, student.password, undefined, undefined, student.career_id);
        console.log(newStudent);
        try {
            const docRef = await addDoc(collection(this.db, 'students'), newStudent.toObject());
            return docRef;
        } catch (error) {
            console.error('Error adding document:', error);
            throw error;
        }
    }

    async updateStudent(id, student) {
        const newStudent = new models.Student(student.name, student.email, student.phone_number, student.password, student.info, student.rating, student.career_id);
        try {
            const docRef = doc(this.db, 'students', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                await setDoc(docRef, newStudent.toObject());
                return true;
            } else {
                console.log('No such document!');
                return false;
            }
        } catch (error) {
            console.error('Error updating document:', error);
            throw error;
        }
    }
}

module.exports = { StudentController };