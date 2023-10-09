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
    let stop = false;
    const student = await controllers.StudentController.getStudentByEmail(req.body.email);
    if (student === undefined) return res.json({ message: "The email or password is incorrect" }).status(404);
    else {
        stop = true;
        bcrypt.compare(req.body.password, student.password, function (err, result) {
            if (result) {
                const token = jwt.sign({ id: student.id }, process.env.TOKEN_SECRET, { expiresIn: 60 });
                res.json({
                    status: "Success",
                    message: "Login successful!",
                    token: token,
                    data: {
                        id: student.id,
                        name: student.name,
                        email: student.email,
                        rating: student.rating,
                        career_id: student.career_id
                    }
                }).status(200);
            } else {
                return res.json({ message: "The email or password is incorrect" }).status(401);
            }
        });
    }
    if (stop) return;
    const admin = await controllers.AdminController.getAdminByEmail(req.body.email);
    if (admin == undefined) {
        return res.json({ message: "The email or password is incorrect" }).status(404);
    }
    else {
        bcrypt.compare(req.body.password, admin.password, function (err, result) {
            if (result) {
                return res.json({
                    status: "Success",
                    message: "Login successful!",
                    data: {
                        id: admin.id,
                        name: admin.name,
                        email: admin.email
                    }
                }).status(200);
            } else {
                return res.json({ message: "The email or password is incorrect" }).status(200);
            }
        });
    }

    // if (!(student && admin)) return res.json({ message: "The email or password is incorrect" }).status(404);
});

module.exports = router;