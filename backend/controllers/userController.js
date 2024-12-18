const User = require("../models/User");

const userController ={
    getAllUsers: async(req,res)=>{
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //delete User
    deleteUser: async(req,res) =>{
        try {
            const user = User.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfull");
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
module.exports = userController;