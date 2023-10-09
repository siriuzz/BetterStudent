const db = require('./firestore');
const { StudentController, AdminController, ReviewController } = require('./controllers');

const controllers = {
    StudentController: new StudentController(db),
    AdminController: new AdminController(db),
    ReviewController: new ReviewController(db)
    // Add more controllers as needed
};

module.exports = controllers;
