const express = require('express');
const app = express();
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerDocument = require('./swagger-output.json');
const bcrypt = require('bcrypt');
// const Firebase = require('./firebase');
const controllers = require('./firebase/dependency-injection')

require('dotenv').config();

// const firebase = Firebase.getInstance();
// const db = firebase.db;

const port = process.env.EXPO_PUBLIC_EXPRESS_PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// router.get('/', (req, res) => {
//     res.send('Hello World!');
// });
//Students works
router.use('/', swaggerUi.serve,);
router.get('/Students', swaggerUi.serve, async (req, res) => {
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
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async function (err, hash) {
            req.body.password = hash;
            await controllers.StudentController.addStudent(req.body);
            // const student = await firebase.addDocumentToCollection('students', req.body);
            res.json({ message: "The student has been created" }).status(200);
        });
    });
});

router.get('/Students/:id', async (req, res) => {
    /*#swagger.tags = ['Students']*/
    const student = await controllers.StudentController.getStudentById(req.params.id);
    res.json(student).status(200);
}).put('/Students/:id', async (req, res) => {
    /*#swagger.tags = ['Students']*/
    await controllers.StudentController.updateStudent(req.params.id, req.body);
    res.json({ message: "The student has been updated" }).status(200);
}).delete('/Students/:id', async (req, res) => {
    /*#swagger.tags = ['Students']*/
    await controllers.StudentController.deleteStudent(req.params.id);
    res.json({ message: "The student has been deleted" }).status(200);
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = router;