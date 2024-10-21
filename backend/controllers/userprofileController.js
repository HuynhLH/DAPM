// routes/user.js
const express = require('express');
const User = require('../models/User'); 
const router = express.Router();

router.put('/users/:id', async (req, res) => {
    const { avatar, gender, date_of_birth } = req.body; 
    const userId = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { avatar, gender, date_of_birth }, 
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
