CREATE PROCEDURE IF NOT EXISTS `insertInscription`(
    IN participantFirstName VARCHAR(255),
    IN participantLastName VARCHAR(255),
    IN linkedEventID INT,
    IN participantDateInscription DATE
)
BEGIN
    DECLARE inscriptions_count INT;
    SELECT personnes_max INTO @personnes_max 
    FROM events 
    WHERE id = linkedEventID;

    IF @personnes_max IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'événement non trouvé.';
    ELSE
        SELECT COUNT(*) INTO inscriptions_count 
        FROM inscriptions 
        WHERE event_id = linkedEventID;

        IF inscriptions_count >= @personnes_max THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'nombre maximum de participants est atteint';
        ELSE
            INSERT INTO inscriptions (event_id, name, lastName, date_inscription)
            VALUES (linkedEventID, participantFirstName, participantLastName, participantDateInscription);
        END IF;
    END IF;
    SELECT @personnes_max;
END;