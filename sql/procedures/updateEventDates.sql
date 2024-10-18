CREATE PROCEDURE IF NOT EXISTS `updateEventDates`(
    IN eventID INT,
    IN newDateDebut DATETIME,
    IN newDateFin DATETIME
)
BEGIN
    UPDATE events
    SET date_debut = newDateDebut,
        date_fin = newDateFin
    WHERE id = eventID;
END;