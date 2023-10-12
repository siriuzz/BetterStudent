const router = require('express').Router();
const controllers = require('../firebase/dependency-injection');

router.post('/Subjects', async (req, res) => {
    /*#swagger.tags = ['Subjects']
    #swagger.requestBody = {
        schema: { $ref: "#/components/schemas/Subject" }
    }
    */
    // const subjects = [
    //     {
    //         "name": "Matemáticas"
    //     },
    //     {
    //         "name": "Historia"
    //     },
    //     {
    //         "name": "Ciencias"
    //     },
    //     {
    //         "name": "Literatura"
    //     },
    //     {
    //         "name": "Programación"
    //     }
    // ];
    // subjects.forEach(async (subject) => {
    //     await controllers.SubjectController.createSubject(subject);
    // }
    // );
    await controllers.SubjectController.createSubject(req.body);

    res.json({ message: "The subject has been created" }).status(200);

})

module.exports = router;