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

module.exports = { getEvents, renderEditEvent, updateEvent, deleteEvent, deleteParticipant };