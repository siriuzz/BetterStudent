const { db, auth } = require('./firestore');
const { UserController, StudentController, AdminController, ReviewController, CareerController } = require('./controllers');

const controllers = {
    UserController: new UserController(db, auth),
    StudentController: new StudentController(db, auth),
    AdminController: new AdminController(db, auth),
    ReviewController: new ReviewController(db),
    CareerController: new CareerController(db),
    // Add more controllers as needed
};

module.exports = controllers;
