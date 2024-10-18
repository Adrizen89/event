
CREATE PROCEDURE IF NOT EXISTS `insertEvent`(
    IN eventName VARCHAR(255),
    IN eventDateCreation DATETIME,
    IN eventDateDebut DATETIME,
    IN eventDateFin DATETIME,
    IN eventPersonnesMax INT,
    IN eventLieu VARCHAR(255)
)
BEGIN
    INSERT INTO events (name, date_creation, date_debut, date_fin, personnes_max, lieu)
    VALUES (eventName, eventDateCreation, eventDateDebut, eventDateFin, eventPersonnesMax, eventLieu);
    SELECT LAST_INSERT_ID() AS newEventID;
END;