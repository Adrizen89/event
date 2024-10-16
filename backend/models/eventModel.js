const mongoose = require('mongoose')

const EventSchema = mongoose.Schema({
    name:String,
    location:String,
    attendees: [
        {
            firstName:String, 
            lastName:String,
            dateJoined:Date
        }
    ]
});

module.exports = mongoose.model("Event", EventSchema);