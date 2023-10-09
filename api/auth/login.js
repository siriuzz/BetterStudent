const router = require('express').Router();
const controllers = require('../../firebase/dependency-injection');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    /*#swagger.tags = ['Login']*/
    /*#swagger.responses[200] = {
        schema: { $ref: "#/components/schemas/Student" }
    }
    #swagger.requestBody = {
        schema: { $ref: "#/components/schemas/Student" }
    }
    */
    const student = await controllers.StudentController.getStudentByEmail(req.body.email);
    let stop = false;
    if (student === undefined) return res.json({ message: "The email or password is incorrect" }).status(404);
    else {
        const result = bcrypt.compare(req.body.password, student.password);
        if (result) {
            stop = true;
            res.json({
                status: "Success",
                message: "Login successful!",
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
    }
    if (stop) { return "done"; }
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