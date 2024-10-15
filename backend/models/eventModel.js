const mongoose = require('mongoose')

const EventSchema = mongoose.Schema({
    name:String,
    location:String
});

module.exports = mongoose.model("Event", EventSchema);