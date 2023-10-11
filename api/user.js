const router = require('express').Router();
const controllers = require('../firebase/dependency-injection');

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
        id: user.id,
        name: user.name,
        email: user.email,
        rating: user.rating,
        career_id: user.career_id
    }).status(200);
    // if (!(student && admin)) return res.json({ message: "The email or password is incorrect" }).status(404);
});
router.patch('/change-password', async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        const user = await controllers.UserController.changePassword(email, oldPassword, newPassword);
        res.json(user).status(200);
    } catch (error) {
        res.json(error).status(400);
    }
});


module.exports = router;