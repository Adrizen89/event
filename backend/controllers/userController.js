const User = require('../models/userModel');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.json(savedUser);
    } catch(err) {
        res.status(400).json({ message:err.message });
    }
};

module.exports = { getUsers, createUser };