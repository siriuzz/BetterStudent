const router = require('express').Router();
const controllers = require('../firebase/dependency-injection');

router.get('/Students/:id/Friends', async (req, res) => { //get friends of a student
    /*#swagger.tags = ['Students']*/
    // console.log("xd");
    const friends = await controllers.StudentController.getFriendsByStudentId(req.params.id);
    res.json(friends).status(200);
});

router.post('/Students/:student_id/Friends/:friend_id', async (req, res) => { //add friend to a student
    /*#swagger.tags = ['Students']*/
    /*#swagger.responses[200] = {
        schema: { $ref: "#/components/schemas/Friend" }
    }
    */
    // const friendships = [
    //     {
    //         "student_id": "wW9jvdOQodkLBNMYrfID",
    //         "friend_id": "8XaqZlWYlcvHCaILRYKh"
    //     },
    //     {
    //         "student_id": "wW9jvdOQodkLBNMYrfID",
    //         "friend_id": "JYqkEORsaIEuDOn4iJqX"
    //     },
    //     {
    //         "student_id": "8XaqZlWYlcvHCaILRYKh",
    //         "friend_id": "wW9jvdOQodkLBNMYrfID"
    //     },
    //     {
    //         "student_id": "8XaqZlWYlcvHCaILRYKh",
    //         "friend_id": "JYqkEORsaIEuDOn4iJqX"
    //     },
    //     {
    //         "student_id": "JYqkEORsaIEuDOn4iJqX",
    //         "friend_id": "wW9jvdOQodkLBNMYrfID"
    //     },
    //     {
    //         "student_id": "JYqkEORsaIEuDOn4iJqX",
    //         "friend_id": "8XaqZlWYlcvHCaILRYKh"
    //     }
    // ];
    // friendships.forEach(async (friendship) => {
    //     await controllers.StudentController.addFriend(friendship.student_id, friendship.friend_id);
    // });
    await controllers.StudentController.addFriend(req.params.student_id, req.params.friend_id);
    res.json({ message: "The friend has been added" }).status(200);
}).delete('/Students/:student_id/Friends/:friend_id', async (req, res) => { //delete friend from a student
    /*#swagger.tags = ['Students']*/
    /*#swagger.responses[200] = {
        schema: { $ref: "#/components/schemas/Friend" }
    }
    */
    await controllers.StudentController.deleteFriend(req.params.student_id, req.params.friend_id);
    res.json({ message: "The friend has been deleted" }).status(200);
});

module.exports = router;