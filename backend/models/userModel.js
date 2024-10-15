const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:String,
    age:Number,
    adress:String
});

module.exports = mongoose.model("User", UserSchema);
