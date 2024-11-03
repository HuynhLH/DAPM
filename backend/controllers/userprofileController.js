// controllers/userController.j
const User = require('../models/User');
const bcrypt = require('bcrypt'); 

exports.updateUser = async (req, res) => {
    const { avatar, gender, date_of_birth, username, email, password } = req.body; 
    const userId = req.params.id;

    try {
        // Tạo một đối tượng cập nhật
        const updatedFields = {
            avatar,
            gender,
            date_of_birth,
            username,  // Thêm username
            email,     // Thêm email
        };

        // Nếu có password, cần phải mã hóa trước khi lưu
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10); // Bạn cần import bcrypt
            updatedFields.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updatedFields,
            { new: true, runValidators: true } // `runValidators` sẽ kiểm tra các validator
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

