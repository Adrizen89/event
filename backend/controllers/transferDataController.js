const Event = require("../models/eventModel");
const { insertEvent, insertInscription } = require('../services/sqlService');

const transferData = async () => {
    try {
        const events = await Event.find({});

        for (const event of events) {
            const eventID = await insertEvent(
                event.name || 'Nom par défaut',
                new Date(),
                event.date_start || new Date(),
                event.date_finish || new Date(),
                event.max_attendees,
                event.location || 'Lieu par défaut'
            );
            console.log(`Event ${event.name || 'Nom par défaut'} transféré avec succès !`);

            // Utiliser `eventID` pour les inscriptions
            for (const attendee of event.attendees) {
                const firstName = attendee.firstName || 'Prénom inconnu';
                const lastName = attendee.lastName || 'Nom inconnu';
                const dateJoined = attendee.dateJoined || new Date();

                await insertInscription(firstName, lastName, dateJoined, eventID);
                console.log(`Inscription de ${firstName} ${lastName} transférée avec succès !`);
            }
        }
    } catch (error) {
        console.error('Erreur pendant le transfert :', error);
    }
};

module.exports = transferData;
