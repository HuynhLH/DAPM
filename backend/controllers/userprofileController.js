// controllers/userController.j
const User = require('../models/User');
const bcrypt = require('bcrypt'); 

exports.updateUser = async (req, res) => {
    const { username, email, password } = req.body; 
    const userId = req.params.id;

    try {
        const updatedFields = {
            
            username,  
            email,  
        };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10); 
            updatedFields.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updatedFields,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Người dùng không tìm thấy." });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: "Cập nhật thông tin người dùng không thành công." });
    }
};

