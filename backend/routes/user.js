const middlewareWrapper = require("cors");
const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userController");

const router = require("express").Router();


 
router.get("/",middlewareController.verifyToken, userController.getAllUsers);

// DELETE USER
//v1/user/
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);
module.exports = router; 