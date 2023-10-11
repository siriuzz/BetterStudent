const { collection, addDoc, doc, getDoc, deleteDoc, setDoc, getDocs, query, where } = require('firebase/firestore');
const models = require('./models');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updatePassword } = require('firebase/auth');
const { getStorage, ref, uploadString, getDownloadURL } = require('firebase/storage');

class UserController {
    constructor(database, auth) {
        this.db = database;
        this.auth = auth;
    }

    async signInUser(email, password) {
        try {
            await signInWithEmailAndPassword(this.auth, email, password);
            const student = await new StudentController(this.db, this.auth).getStudentByEmail(email);
            // console.log("Este es el estudiante: ",);
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

    async signOutUser() {
        try {
            await signOut(this.auth);
        } catch (error) {
            console.log(error);
        }
    }

    async uploadUserProfileImage(userId, imageBase64) {
        try {
            const storage = getStorage();
            // Create a reference to the storage location where you want to store the image
            const storageRef = ref(storage, `user_profile_images/${userId}.jpg`);

            // Upload the image as a base64 string (you can also use Blob or File)
            await uploadString(storageRef, imageBase64, 'base64');

            // Get the download URL of the uploaded image
            const imageUrl = await getDownloadURL(storageRef);

            return imageUrl; // This URL can be saved in the user's authentication profile
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    async changePassword(email, oldPassword, newPassword) {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, oldPassword);
            const user = userCredential.user;
            await updatePassword(user, newPassword);
            return user;
        } catch (error) {
            console.log(error);
            throw error;
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
                return { ...data, id: querySnap.docs[0].id };
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
            const userCredential = await createUserWithEmailAndPassword(this.auth, student.email, student.password);
            const user = userCredential.user;
            // console.log(user);
            await updateProfile(user, {
                displayName: student.name,
                photoURL: undefined
            });
            // console.log(user);
            const newStudent = new models.Student(student.name, student.email, student.phone_number, student.info, student.rating, student.career_id);
            // console.log(newStudent);
            const docRef = addDoc(collection(this.db, 'students'), newStudent.toObject());
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

    async addFriend(studentId, friendId) {
        try {
            const docRef = doc(this.db, 'students', studentId);
            const friendsRef = await addDoc(collection(docRef, 'friends'), { friend_id: friendId });
            return friendsRef;
        } catch (error) {
            console.error('Error updating document:', error);
            throw error;
        }
    }

    async getFriendsByStudentId(id) {
        try {
            const q = query(collection(this.db, 'students', id, 'friends'));
            const querySnap = await getDocs(q);
            const documentsPromises = querySnap.docs.map(async (document) => {
                const friend_id = document.data().friend_id;
                const docRef = doc(this.db, 'students', friend_id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    // console.log(docSnap.data());
                    const studentData = docSnap.data();
                    const careerRef = doc(this.db, 'careers', studentData.career_id);

                    const careerDocSnap = await getDoc(careerRef);
                    if (careerDocSnap.exists()) {
                        const careerData = careerDocSnap.data();
                        return { ...studentData, career: careerData, id: docSnap.id };
                    } else {
                        console.log('No such document!');
                        return null;
                    }
                } else {
                    console.log('No such document!');
                    return null;
                }
            });
            const documents = await Promise.all(documentsPromises);

            // console.log(documents);
            return documents;
        } catch (error) {
            console.error('Error getting documents:', error);
            throw error;
        }
    }

    async deleteFriend(studentId, friendId) {
        try {
            console.log(studentId, friendId);
            const friendsRef = collection(this.db, 'students', studentId, 'friends');
            const q = query(friendsRef, where('friend_id', '==', friendId));
            const querySnap = await getDocs(q);
            const documentsId = [];
            querySnap.forEach((doc) => {
                documentsId.push(doc.id);
            });
            let friendDocId = documentsId[0];
            const docRef = doc(this.db, 'students', studentId, 'friends', friendDocId);
            await deleteDoc(docRef);
            // await deleteDoc(docRef);
            return true;
        } catch (error) {
            console.error('Error deleting document:', error);
            throw error;
        }
    }


    async createReview(student_id, review) {
        const newReview = new models.Review(review.student_id, review.title, review.comment, review.rating, new Date());
        // console.log(newReview);
        try {
            const docRef = doc(this.db, 'students', student_id);
            const reviewsRef = await addDoc(collection(docRef, 'reviews'), newReview.toObject());
            return reviewsRef;
        } catch (error) {
            console.error('Error adding document:', error);
            throw error;
        }
    }

    async getReviewsByStudentId(id) {
        try {
            const q = query(collection(this.db, 'students', id, 'reviews'));
            const querySnap = await getDocs(q);
            const documents = [];
            querySnap.forEach((doc) => {
                // console.log(doc.data);
                documents.push(doc.data());
            });
            // console.log(documents);
            return documents;
        } catch (error) {
            console.error('Error getting documents:', error);
            throw error;
        }
    }
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
                return { ...data, id: docSnap.docs[0].id };
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


}

class CareerController {
    constructor(database) {
        this.db = database;
    }

    async getAllCareers() {
        try {
            const collectionRef = collection(this.db, 'careers');
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

    async getCareerById(id) {
        try {
            const docRef = doc(this.db, 'careers', id);
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

    async getCareerByName(name) {
        try {
            const q = query(collection(this.db, 'careers'), where('name', '==', name));
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

    async addCareer(career) {
        const newCareer = new models.Career(career.name, career.faculty);
        try {
            const docRef = await addDoc(collection(this.db, 'careers'), newCareer.toObject());
            return docRef;
        } catch (error) {
            console.error('Error adding document:', error);
            throw error;
        }
    }

    async updateCareer(id, career) {
        const newCareer = new models.Career(career.name, career.faculty);
        try {
            const docRef = doc(this.db, 'careers', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                await setDoc(docRef, newCareer.toObject());
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



module.exports = {
    UserController,
    StudentController,
    AdminController,
    ReviewController,
    CareerController
};