const router = require('express').Router();
const controllers = require('../firebase/dependency-injection');

//reviews
router.get('/Students/:id/Reviews', async (req, res) => {
    /*#swagger.tags = ['Students']*/
    const reviews = await controllers.StudentController.getReviewsByStudentId(req.params.id);
    res.json(reviews).status(200);
}).post('/Students/:id/Reviews/', async (req, res) => {
    /*#swagger.tags = ['Reviews']*/
    /*#swagger.responses[200] = {
        schema: { $ref: "#/components/schemas/Review" }
    }
    */
    // const reviews = [
    //     // Reseñas para el primer estudiante
    //     {
    //         "student_id": "8XaqZlWYlcvHCaILRYKh",
    //         "title": "Gran desempeño",
    //         "comment": "Este estudiante tuvo un excelente desempeño en el curso. Muy recomendado.",
    //         "rating": 5
    //     },
    //     {
    //         "student_id": "8XaqZlWYlcvHCaILRYKh",
    //         "title": "Buen trabajo",
    //         "comment": "El estudiante hizo un buen trabajo durante el curso. Se destaca en su área.",
    //         "rating": 4
    //     },
    //     {
    //         "student_id": "8XaqZlWYlcvHCaILRYKh",
    //         "title": "Sobresaliente",
    //         "comment": "El desempeño de este estudiante fue sobresaliente. ¡Impresionante!",
    //         "rating": 5
    //     },

    //     // Reseñas para el segundo estudiante
    //     {
    //         "student_id": "JYqkEORsaIEuDOn4iJqX",
    //         "title": "Muy comprometido",
    //         "comment": "Este estudiante mostró un compromiso excepcional durante el curso. Muy recomendado.",
    //         "rating": 5
    //     },
    //     {
    //         "student_id": "JYqkEORsaIEuDOn4iJqX",
    //         "title": "Buen compañero",
    //         "comment": "Un compañero muy amigable y colaborador en el curso. Un placer trabajar juntos.",
    //         "rating": 4
    //     },
    //     {
    //         "student_id": "JYqkEORsaIEuDOn4iJqX",
    //         "title": "Muy satisfecho",
    //         "comment": "Estoy muy satisfecho con el desempeño de este estudiante. Lo recomendaría a otros.",
    //         "rating": 5
    //     },

    //     // Reseñas para el tercer estudiante
    //     {
    //         "student_id": "wW9jvdOQodkLBNMYrfID",
    //         "title": "Excelente trabajo",
    //         "comment": "El trabajo de este estudiante fue excelente durante el curso. Muy impresionado.",
    //         "rating": 5
    //     },
    //     {
    //         "student_id": "wW9jvdOQodkLBNMYrfID",
    //         "title": "Muy dedicado",
    //         "comment": "Este estudiante demostró una dedicación inquebrantable. Altamente recomendado.",
    //         "rating": 4
    //     },
    //     {
    //         "student_id": "wW9jvdOQodkLBNMYrfID",
    //         "title": "Buen rendimiento",
    //         "comment": "El estudiante tuvo un buen rendimiento en el curso. Merece reconocimiento.",
    //         "rating": 4
    //     }
    // ];

    // reviews.forEach(async (review) => {
    //     await controllers.StudentController.createReview(review.student_id, review);
    // });
    // await controllers.ReviewController.createReview(req.params.id, req.body);
    res.json({ message: "The review has been created" }).status(200);
});

module.exports = router;