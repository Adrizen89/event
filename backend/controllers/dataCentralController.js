const Event = require("../models/eventModel");
const { insertEvent, insertInscription, updateEventDates } = require('../services/dataCentralService');

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

const updateDates = async (eventID, newDateStart, newDateFinish) => {
    try {
        // Appel direct à la procédure pour mettre à jour les dates dans MySQL
        const updateStatus = await updateEventDates(eventID, newDateStart, newDateFinish);

        if (updateStatus) {
            console.log(`Dates de l'événement avec ID ${eventID} mises à jour avec succès !`);
        } else {
            console.warn(`Échec de la mise à jour des dates pour l'événement avec ID ${eventID}.`);
        }
    } catch (error) {
        console.error('Erreur pendant la mise à jour des dates :', error);
    }
};

module.exports = { transferData, updateDates };
