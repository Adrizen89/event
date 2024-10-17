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
        const [rows] = await mysqlConnection.execute('SELECT * FROM events WHERE id = ?', [eventId]);
        await mysqlConnection.end();

        if (rows.length > 0) {
            const event = rows[0];
            res.render('editEvent', { event }); // Affiche la vue d'édition avec les données de l'événement
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

module.exports = { getEvents, renderEditEvent, updateEvent, deleteEvent };