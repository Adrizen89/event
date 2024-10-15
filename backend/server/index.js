const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/demo', {
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});


const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const UserModel = mongoose.model("users", UserSchema);

app.get("/getUsers", (req, res) => {
    UserModel.find({})
        .then(function(users) {
            res.json(users);
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred' });
        });
});

app.listen(3001, () => {
    console.log("Server is Running on port 3001");
});
