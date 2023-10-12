const router = require('express').Router();
const controllers = require('../firebase/dependency-injection');

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

    // const estudiantes = [
    //     {
    //         "name": "María Pérez",
    //         "email": "maria.perez@example.com",
    //         "phone_number": "1234567891",
    //         "info": "Información sobre María Pérez",
    //         "rating": 5,
    //         "career_id": "DwWfXgEhAB1s8ESwF8RC",
    //         "password": "prueba"
    //     },
    //     {
    //         "name": "Juan Martínez",
    //         "email": "juan.martinez@example.com",
    //         "phone_number": "1234567892",
    //         "info": "Información sobre Juan Martínez",
    //         "rating": 5,
    //         "career_id": "dOYSwg9Mk3VUnN1kpmhA",
    //         "password": "prueba"
    //     },
    //     {
    //         "name": "Luisa Rodríguez",
    //         "email": "luisa.rodriguez@example.com",
    //         "phone_number": "1234567893",
    //         "info": "Información sobre Luisa Rodríguez",
    //         "rating": 5,
    //         "career_id": "zShbOdjKP5PkbZ98a5eu",
    //         "password": "prueba"
    //     }
    // ];
    // estudiantes.forEach(async (estudiante) => {
    //     await controllers.StudentController.addStudent(estudiante);
    // });
    await controllers.StudentController.addStudent(req.body);
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

router.patch('/Students/:id/calculate-rating', async (req, res) => {
    /*#swagger.tags = ['Students']*/
    /*#swagger.params['id'] = {
        in: 'path',
        description: 'Student ID',
        required: true,
        type: 'string'
    }*/
    const student = await controllers.StudentController.calculateRating(req.params.id);
    res.json(student).status(200);
});

module.exports = router;