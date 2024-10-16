const mongoose = require('mongoose')

const EventSchema = mongoose.Schema({
    name:String,
    location:String,
    date_start:Date,
    date_finish: Date,
    max_attendees : Number,
    attendees: [
        {
            firstName:String, 
            lastName:String,
            dateJoined:Date
        }
    ]
});

module.exports = mongoose.model("Event", EventSchema);