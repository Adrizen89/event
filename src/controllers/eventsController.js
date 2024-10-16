const connectMySQL = require('../config/db_mysql');
const Event = require('../models/eventModel');


//Récupérer les events 
const getEvents = async (req, res) => {
    try {
        const mongoEvents = await Event.find({});

        const mysqlConnection = await connectMySQL();
        const [mysqlEvents] = await mysqlConnection.execute('SELECT * FROM events');
        await mysqlConnection.end();

        res.render('index', { mongoEvents, mysqlEvents });
    } catch(err) {
        res.status(500).json({message : err.message});
    }
}

//récup event choisi pour l'édition
const renderEditEvent = async (req, res) => {
    const eventId = req.params.id;

    try {
        const mysqlConnection = await connectMySQL();
        const [eventRows] = await mysqlConnection.execute('SELECT * FROM events WHERE id = ?', [eventId]);
        const [participantRows] = await mysqlConnection.execute('SELECT name AS firstName, lastName FROM inscriptions WHERE event_id = ?', [eventId]);
        await mysqlConnection.end();

        if (eventRows.length > 0) {
            const event = eventRows[0];
            event.participants = participantRows.map(participant => ({
                firstName: participant.firstName,
                lastName: participant.lastName
            }));
            res.render('editEvent', { event }); 
        } else {
            res.status(404).send('Événement non trouvé');
        }
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'événement' });
    }
};

//modif de l'event sur mysql
const updateEvent = async (req, res) => {
    const { id, date_debut, date_fin } = req.body;
    console.log(req.body);

    try {
        const mysqlConnection = await connectMySQL();
        await mysqlConnection.execute('CALL updateEventDates(?, ?, ?)', [id, date_debut, date_fin]);
        await mysqlConnection.end();

        res.redirect('/api/events'); // Redirige vers la page d'accueil ou celle souhaitée après mise à jour
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'événement', error: err.message });
    }
};

const deleteEvent = async (req, res) => {
    const eventID = req.params.id;

    try {
        const mysqlConnection = await connectMySQL();
        await mysqlConnection.execute('CALL deleteEvent(?)', [eventID]);
        await mysqlConnection.end(); 

        res.status(204).send();
    } catch (err) {
        console.error('Erreur lors de la suppression de l\'événement :', err);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'événement', error: err.message });
    }
}



const addParticipant = async (req, res) => {
    const { eventId, firstName, lastName } = req.body;
    const dateInscription = new Date().toISOString().split('T')[0];
    console.log('ID de l\'événement transmis :', eventId);

    try {
        const mysqlConnection = await connectMySQL();

        // Appel de la procédure
        await mysqlConnection.execute('CALL insertInscription(?, ?, ?, ?)', [
            firstName, 
            lastName, 
            eventId, 
            dateInscription
        ]);

        await mysqlConnection.end();
        res.status(200).json({ message: 'Participant ajouté avec succès.' });
    } catch (error) {
        if (error.sqlState === '45000') {
            if (error.sqlMessage.includes('événement non trouvé')) {

                console.error('Erreur : événement non trouvé');
                res.status(400).json({ status: 'error', message: 'Événement non trouvé' });
            } else if (error.sqlMessage.includes('nombre maximum de participants est atteint')) {

                console.error('Erreur : Le nombre maximum de participants est atteint');
                res.status(400).json({ status: 'error', message: 'Nombre maximum de participants atteint' });
            }
        } else {

            console.error('Erreur inattendue:', error);
            res.status(500).json({ status: 'error', message: 'Erreur interne du serveur' });
        }
    }
};




const deleteParticipant = async (req, res) => {
    const { firstName, lastName } = req.body;
    const eventId = req.params.id;
    console.log(req.body);
    try {
        const mysqlConnection = await connectMySQL();
        await mysqlConnection.execute('CALL unregisterParticipant(?, ?, ?)', [firstName, lastName, eventId]);
        await mysqlConnection.end();

        res.status(204).send(); // Retourne un statut 204 si la suppression est réussie
    } catch (err) {
        console.error("Erreur lors de la suppression de l'inscription :", err);
        res.status(500).json({ message: "Erreur lors de la suppression de l'inscription", error: err.message });
    }
}
const createEvent = async (req, res) => {
    const { name, date_debut, date_fin, personnes_max, lieu } = req.body;


    try {
        const mysqlConnection = await connectMySQL();
        const date_creation = new Date();
        const [result] = await mysqlConnection.execute('CALL insertEvent(?, ?, ?, ?, ?, ?)', [name, date_creation, date_debut, date_fin, personnes_max, lieu]);
        await mysqlConnection.end();

        const newEventID = result?.[0]?.[0]?.newEventID || null;

        if (newEventID) {
            res.redirect('/api/events?success=true'); 
        } else {
            res.status(500).json({ message: 'Erreur lors de la création : ID non récupéré', result });
        }
    } catch (err) {
        console.error('Erreur lors de la création de l\'événement :', err);
        res.status(500).json({ message: 'Erreur lors de la création de l\'événement', error: err.message });
    }
};



module.exports = { getEvents, renderEditEvent, updateEvent, deleteEvent, addParticipant, deleteParticipant, createEvent };

