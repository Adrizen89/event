const Event = require('../models/eventModel');


//Récupérer les events 
const getEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch(err) {
        res.status(500).json({message : err.message});
    }
}

module.exports = { getEvents };