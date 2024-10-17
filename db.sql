CREATE DATABASE events;
USE events;

CREATE TABLE events (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,
    date_creation DATETIME DEFAULT NULL,
    date_debut DATETIME DEFAULT NULL,
    date_fin DATETIME DEFAULT NULL,
    personnes_max INT DEFAULT NULL,
    lieu VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE inscriptions (
    id INT NOT NULL AUTO_INCREMENT,
    event_id INT DEFAULT NULL,
    name VARCHAR(255) DEFAULT NULL,
    lastName VARCHAR(255) DEFAULT NULL,
    date_inscription DATE DEFAULT NULL,
    PRIMARY KEY (id),
    KEY event_id (event_id),
    CONSTRAINT inscriptions_ibfk_1 FOREIGN KEY (event_id) REFERENCES events (id)
);

DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE deleteEvent(
    IN eventID INT
)
BEGIN
    DELETE FROM inscriptions WHERE event_id = eventID;
    DELETE FROM events WHERE id = eventID;
END //

CREATE DEFINER=`root`@`localhost` PROCEDURE insertEvent(
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
END //

CREATE DEFINER=`root`@`localhost` PROCEDURE unregisterParticipant(
    IN participantFirstName VARCHAR(255),
    IN participantLastName VARCHAR(255),
    IN linkedEventID INT
)
BEGIN
    DELETE FROM inscriptions
    WHERE name = participantFirstName
    AND lastName = participantLastName
    AND event_id = linkedEventID;
END //

CREATE DEFINER=`root`@`localhost` PROCEDURE updateEventDates(
    IN eventID INT,
    IN newDateDebut DATETIME,
    IN newDateFin DATETIME
)
BEGIN
    UPDATE events
    SET date_debut = newDateDebut,
        date_fin = newDateFin
    WHERE id = eventID;
END //

DELIMITER ;
