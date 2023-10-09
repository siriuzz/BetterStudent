const { collection, addDoc, doc, getDoc, deleteDoc, setDoc, getDocs, query, where } = require('firebase/firestore');
const models = require('./models');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');

class UserController {
    constructor(database, auth) {
        this.db = database;
        this.auth = auth;
    }

    async signInUser(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            const student = await new StudentController(this.db, this.auth).getStudentByEmail(email);
            if (student) return student;
            const admin = await new AdminController(this.db, this.auth).getAdminByEmail(email);
            if (admin) return admin;

            // return userCredential.user;
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            return error;
        }
    }
}

class StudentController {
    constructor(database, auth) {
        this.db = database;
        this.auth = auth;
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
            const q = query(collection(this.db, 'students'), where('email', '==', email));
            const querySnap = await getDocs(q);
            if (querySnap.docs[0]) {
                const data = querySnap.docs[0].data();
                return data;
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
        // const newStudent = new models.Student(student.name, student.email, student.phone_number, student.password, undefined, undefined, student.career_id);
        // console.log(newStudent);
        try {
            createUserWithEmailAndPassword(this.auth, student.email, student.password).then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                const newStudent = new models.Student(student.name, student.email, student.phone_number, undefined, undefined, student.career_id);
                // console.log(newStudent);
                const docRef = addDoc(collection(this.db, 'students'), newStudent.toObject());
                return docRef;
                // ...
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                // ..
            });
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

    // async signInStudent(email, password) {
    //     console.log(email, password);
    //     signInWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
    //         // Signed in
    //         const user = userCredential.user;
    //         // console.log(user);
    //         return user;
    //         // ...
    //     }).catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log(errorCode);
    //         console.log(errorMessage);
    //         // ..
    //     });
    // };
}

class AdminController {
    constructor(database, auth) {
        this.db = database;
    }

    async getAllAdmins() {
        try {
            const collectionRef = collection(this.db, 'admins');
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

    async getAdminById(id) {
        try {
            const docRef = doc(this.db, 'admins', id);
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

    async getAdminByEmail(email) {
        try {
            const q = query(collection(this.db, 'admins'), where('email', '==', email));
            const docSnap = await getDocs(q);
            if (docSnap.docs[0]) {
                const data = docSnap.docs[0].data();
                return data;
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error getting document:', error);
        }
    }
}

class ReviewController {
    constructor(database) {
        this.db = database;
    }

    async getAllReviews() {
        try {
            const collectionRef = collection(this.db, 'reviews');
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

    async getReviewsByStudentId(id) {
        try {
            const q = query(collection(this.db, 'reviews'), where('student_id', '==', id));
            const querySnap = await getDocs(q);
            const documents = [];
            querySnap.forEach((doc) => {
                console.log(doc.data);
                documents.push(doc.data());
            });
            return documents;
        } catch (error) {
            console.error('Error getting documents:', error);
            throw error;
        }
    }

    async createReview(review) {
        const newReview = new models.Review(review.student_id, review.title, review.comment, review.rating, undefined);
        try {
            const docRef = await addDoc(collection(this.db, 'reviews'), newReview.toObject());
            return docRef;
        } catch (error) {
            console.error('Error adding document:', error);
            throw error;
        }
    }
}

module.exports = { UserController, StudentController, AdminController, ReviewController };