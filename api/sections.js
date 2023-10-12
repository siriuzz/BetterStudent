const router = require('express').Router();
const controllers = require('../firebase/dependency-injection');

router.post('/Sections', async (req, res) => {
    /*#swagger.tags = ['Sections']
    #swagger.requestBody = {
        schema: { $ref: "#/components/schemas/Section" }
    }
    */
    // const Sections = [
    //     {
    //         "subject_id": "Fm9l83kLKHkkseGoAxOZ",
    //         "classroom_code": "A101",
    //         "professor_id": "3olgWZLAJoOdhEaNALzR",
    //         "number": 1
    //     },
    //     {
    //         "subject_id": "TzIjEgmu5vGOJoXKEwQA",
    //         "classroom_code": "B202",
    //         "professor_id": "rHwxwGG8EMGw85rqw5rf",
    //         "number": 1
    //     },
    //     {
    //         "subject_id": "nBRhG45Wgd4oloC5IO90",
    //         "classroom_code": "C303",
    //         "professor_id": "wZqzj3squ7F8qefBrWwV",
    //         "number": 1
    //     },
    //     {
    //         "subject_id": "oXX8fzmzFzWrGldwXUsA",
    //         "classroom_code": "D404",
    //         "professor_id": "3olgWZLAJoOdhEaNALzR",
    //         "number": 1
    //     },
    //     {
    //         "subject_id": "pnZ3koLs7TJQUN5ZJA8o",
    //         "classroom_code": "E505",
    //         "professor_id": "rHwxwGG8EMGw85rqw5rf",
    //         "number": 1
    //     }
    // ]
    // Sections.forEach(async (section) => {
    //     await controllers.SectionController.createSection(section);
    // }
    // );
    await controllers.SectionController.createSection(req.body);
    res.json({ message: "The section has been created" }).status(200);
});

router.post('/Sections/:section_id/add-student/:student_id', async (req, res) => {
    /*#swagger.tags = ['Sections']
    #swagger.requestBody = {
        schema: { $ref: "#/components/schemas/Student" }
    }
    */
    // const students = [
    //     {
    //         "student_id": "8XaqZlWYlcvHCaILRYKh",
    //         "section_id": "9gyaDx96TxW1r8CMpH30"
    //     },
    //     {
    //         "student_id": "8XaqZlWYlcvHCaILRYKh",
    //         "section_id": "JrUuiTIOLbXNe95o6USg"
    //     },
    //     {
    //         "student_id": "JYqkEORsaIEuDOn4iJqX",
    //         "section_id": "JrUuiTIOLbXNe95o6USg"
    //     },
    //     {
    //         "student_id": "JYqkEORsaIEuDOn4iJqX",
    //         "section_id": "le3Jg5K7aoWUxfPA9n5Q"
    //     },
    //     {
    //         "student_id": "wW9jvdOQodkLBNMYrfID",
    //         "section_id": "9gyaDx96TxW1r8CMpH30"
    //     },
    //     {
    //         "student_id": "wW9jvdOQodkLBNMYrfID",
    //         "section_id": "le3Jg5K7aoWUxfPA9n5Q"
    //     },
    //     {
    //         "student_id": "8XaqZlWYlcvHCaILRYKh",
    //         "section_id": "n4qAPB9C4OjLfhKh7A6l"
    //     },
    //     {
    //         "student_id": "wW9jvdOQodkLBNMYrfID",
    //         "section_id": "n4qAPB9C4OjLfhKh7A6l"
    //     },
    //     {
    //         "student_id": "JYqkEORsaIEuDOn4iJqX",
    //         "section_id": "ofYYO6vQZlttFffpFwjh"
    //     }
    // ]


    // students.forEach(async (student) => {
    //     await controllers.SectionController.addStudent(student.section_id, student.student_id);
    // })
    await controllers.SectionController.addStudent(section_id, student_id);
    res.json({ message: "The student has been added" }).status(200);
});

module.exports = router;