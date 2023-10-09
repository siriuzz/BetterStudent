const router = require('express').Router();
const controllers = require('../firebase/dependency-injection');
const bcrypt = require('bcrypt');

router.get('/Students', async (req, res) => {
    /*#swagger.tags = ['Students']*/
    const students = await controllers.StudentController.getAllStudents();
    res.json(students).status(200);
}).post('/Students', async (req, res) => {
    /*#swagger.tags = ['Students']*/

    /*#swagger.responses[200] = {
        schema: { $ref: "#/components/schemas/Student" }
    }
    #swagger.requestBody = {
        schema: { $ref: "#/components/schemas/Student" }
    }
    */
    await controllers.StudentController.addStudent(req.body);
    // bcrypt.genSalt(10, function (err, salt) {
    //     bcrypt.hash(req.body.password, salt, async function (err, hash) {
    //         req.body.password = hash;
    //         // const student = await firebase.addDocumentToCollection('students', req.body);
    //         res.json({ message: "The student has been created" }).status(200);
    //     });
    // });
    res.json({ message: "The student has been created" }).status(200);
});

router.get('/Students/:id', async (req, res) => {
    /*#swagger.tags = ['Students']*/
    const student = await controllers.StudentController.getStudentById(req.params.id);
    res.json(student).status(200);
}).put('/Students/:id', async (req, res) => {
    /*#swagger.tags = ['Students']

    #swagger.responses[200] = {
        schema: { $ref: "#/components/schemas/Student" }
    }
    #swagger.requestBody = {
        schema: { $ref: "#/components/schemas/Student" }
    }
    */
    await controllers.StudentController.updateStudent(req.params.id, req.body);
    res.json({ message: "The student has been updated" }).status(200);
}).delete('/Students/:id', async (req, res) => {
    /*#swagger.tags = ['Students']*/
    await controllers.StudentController.deleteStudent(req.params.id);
    res.json({ message: "The student has been deleted" }).status(200);
});

//reviews
router.get('/Students/:id/Reviews', async (req, res) => {
    /*#swagger.tags = ['Students']*/
    const reviews = await controllers.StudentController.getReviewsByStudentId(req.params.id);
    res.json(reviews).status(200);
}).post('/Students/:id/Reviews', async (req, res) => {
    /*#swagger.tags = ['Students']*/
    /*#swagger.responses[200] = {
        schema: { $ref: "#/components/schemas/Review" }
    }
    #swagger.requestBody = {
        schema: { $ref: "#/components/schemas/Review" }
    }
    */
    await controllers.StudentController.addReview(req.params.id, req.body);
    res.json({ message: "The review has been created" }).status(200);
});

module.exports = router;