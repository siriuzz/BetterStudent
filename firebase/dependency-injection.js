const { db, auth } = require('./firestore');
const { UserController, SectionController, StudentController, AdminController, SubjectController, ReviewController, ProfessorController, CareerController } = require('./controllers');

const controllers = {
    UserController: new UserController(db, auth),
    StudentController: new StudentController(db, auth),
    AdminController: new AdminController(db, auth),
    ReviewController: new ReviewController(db),
    CareerController: new CareerController(db),
    ProfessorController: new ProfessorController(db),
    SubjectController: new SubjectController(db),
    SectionController: new SectionController(db),
};

module.exports = controllers;
