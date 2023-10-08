const db = require('./firestore');
const { StudentController } = require('./controllers');

const controllers = {
    StudentController: new StudentController(db),
    // Add more controllers as needed
};

module.exports = controllers;
