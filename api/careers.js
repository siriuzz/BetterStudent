const router = require('express').Router();
const controllers = require('../firebase/dependency-injection');

router.post('/Careers', async (req, res) => {
    /*#swagger.tags = ['Careers']*/
    /*#swagger.responses[200] = {
        schema: { $ref: "#/components/schemas/Career" }
    }
    */
    // const careers = [{
    //     "name": "Psicología",
    //     "faculty": "Ciencias Sociales"
    // },
    // {
    //     "name": "Administración de Empresas",
    //     "faculty": "Negocios"
    // }, {
    //     "name": "Ingeniería en Informática",
    //     "faculty": "Ingeniería"
    // }];

    // careers.forEach(async (career) => {
    //     await controllers.CareerController.addCareer(career);
    // });
    await controllers.CareerController.addCareer(req.body);
    res.json({ message: "The career has been created" }).status(200);
});

module.exports = router;