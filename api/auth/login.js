const router = require('express').Router();
const controllers = require('../../firebase/dependency-injection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/login', async (req, res) => {
    /*#swagger.tags = ['Login']*/
    /*#swagger.responses[200] = {
        schema: { $ref: "#/components/schemas/Student" }
    }
    #swagger.requestBody = {
        schema: { $ref: "#/components/schemas/Student" }
    }
    */
    const user = await controllers.UserController.signInUser(req.body.email, req.body.password);
    if (!user) return res.json({ message: "The email or password is incorrect" }).status(404);
    else return res.json({
        name: user.name,
        email: user.email,
        rating: user.rating,
        career_id: user.career_id
    }).status(200);
    // if (!(student && admin)) return res.json({ message: "The email or password is incorrect" }).status(404);
});

module.exports = router;