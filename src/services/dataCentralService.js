const connectMySQL = require('../config/db_mysql');

const insertEvent = async (name, date_creation, date_start, date_finish, max_attendees, lieu) => {
    const connection = await connectMySQL();
    const [rows] = await connection.execute('CALL insertEvent(?, ?, ?, ?, ?, ?)', 
        [name, date_creation, date_start, date_finish, max_attendees, lieu]);
        
    const newEventID = rows[0][0].newEventID;
    await connection.end();
    return newEventID;
};

const insertInscription = async (firstName, lastName, date_inscription, linkedEventID) => {
    const connection = await connectMySQL();
    

    firstName = firstName || 'Prénom inconnu';
    lastName = lastName || 'Nom inconnu';
    date_inscription = date_inscription || new Date().toISOString().split('T')[0];
    linkedEventID = linkedEventID || null; 

    console.log(linkedEventID);

    await connection.execute('CALL insertInscription(?, ?, ?, ?)', 
        [firstName, lastName, linkedEventID, date_inscription]);

    await connection.end();
};

module.exports = { insertEvent, insertInscription };