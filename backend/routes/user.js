const middlewareWrapper = require("cors");
const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userController");
const userprofileController = require ("../controllers/userprofileController");

const router = require("express").Router();


//get all users 
router.get("/",middlewareController.verifyToken, userController.getAllUsers);

// DELETE USER
//v1/user/
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

router.put("/users/:id", middlewareController.verifyTokenAndAdminAuth, userprofileController.updateUser);

module.exports = router; 