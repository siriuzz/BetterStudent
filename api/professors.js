const router = require('express').Router();
const controllers = require('../firebase/dependency-injection');

router.post('/Professors', async (req, res) => {
    /*#swagger.tags = ['Professors']

    /*#swagger.responses[200] = {
        schema: { $ref: "#/components/schemas/Professor" }
    }
    #swagger.requestBody = {
        schema: { $ref: "#/components/schemas/Professor" }
    }
    */
    const professors = [
        {
            "name": "Juan Pérez",
            "email": "juan.perez@example.com"
        },
        {
            "name": "María Rodríguez",
            "email": "maria.rodriguez@example.com"
        },
        {
            "name": "Carlos González",
            "email": "carlos.gonzalez@example.com"
        }
    ];
    professors.forEach(async (professor) => {
        // console.log(professor)
        await controllers.ProfessorController.createProfessor(professor);
    });
    // await controllers.ProfessorController.addProfessor(req.body);
    res.json({ message: "The professor has been created" }).status(200);
});

module.exports = router;