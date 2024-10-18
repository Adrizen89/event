const mongoose = require('mongoose')

const EventSchema = mongoose.Schema({
    name:{type: String, required: [true, "'name' is required"],},
    location:{type:String, required: [true, "'location' is required"],},
    date_start:{type:Date, required: [true, "'date_start' is required"],},
    date_finish: {type:Date, required: [true, "'date_finish' is required"],},
    max_attendees : {type:Number, required: [false],},
    attendees: [
        {
            firstName:{type:String, required: [true, "'firstName' is required"],}, 
            lastName:{type:String, required: [true, "'lastName' is required"],},
            dateJoined:{
                type: Date,
                default: null,
                required: [false],
            }
        }
    ]
});

module.exports = mongoose.model("Event", EventSchema);