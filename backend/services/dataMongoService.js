const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const EventSchema = require('../models/eventModel');
const connectDB = require('../config/db_mongodb');

//Adapter la data des json 
function adaptData(data) {

    const name = data.event || data.e_name || (data.results && data.results[0].event.event_name) || "Unknown Event";
    const date_start = new Date(data.start || data.e_start || (data.results && data.results[0].event.event_begin));
    const date_finish = new Date(data.end || data.e_finish || (data.results && data.results[0].event.event_finish));
    const location = data.e_location || data.where || (data.results && data.results[0].event.event_where) || "Unknown Location";
    const max_attendees = data.max || data.e_attendees_max || 99;


    let attendees = [];

    // Cas 1 ([ "John", "Doe", "2023-03-12" ])
    if (data.attendees && Array.isArray(data.attendees) && Array.isArray(data.attendees[0])) {
        attendees = data.attendees.map(att => ({
            firstName: att[0] || "Unknown",
            lastName: att[1] || "Unknown",
            dateJoined: new Date(att[2] || Date.now())
        }));
        console.log('cas 1')
    } 
    // Cas 2 avec "fn", "ln" et "when"
    else if (data.attendees && Array.isArray(data.attendees) && data.attendees[0].fn) {
        attendees = data.attendees.map(att => ({
            firstName: att.fn || "Unknown",
            lastName: att.ln || "Unknown",
            dateJoined: new Date(att.when || Date.now())
        }));
        console.log('cas 2')
    }
    // Cas 3 avec `attendees` sous `results`
    else if (data.results && data.results[0].attendees) {
        attendees = data.results[0].attendees.map(att => ({
            firstName: att.attendee_1 || "Unknown",
            lastName: att.attendee_2 || "Unknown",
            dateJoined: Date.now() // Pas de date spécifiée
        }));
        console.log('Cas 3')
    }
    else {
        console.log("No attendees found in expected structures");
    }
    return { name, date_start, date_finish, location,max_attendees, attendees };
}

//Import d'un fichier json 
async function importData(){
    try {
        await connectDB();
        const folderPath = path.join(__dirname, '../data');
        const files = fs.readdirSync(folderPath);

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const rawData = fs.readFileSync(filePath);
            const jsonData = JSON.parse(rawData);

            const dataAdapted = adaptData(jsonData);
            const document = new EventSchema(dataAdapted);
            await document.save();
            console.log(`JSON from ${file} is OK !`);
    } 
    console.log('Data imported !')
}catch(err) {
        console.error("Error data import :", err);
    } finally {
        mongoose.connection.close();
    }
}

module.exports = importData;