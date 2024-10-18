CREATE PROCEDURE IF NOT EXISTS `unregisterParticipant`(
    IN participantFirstName VARCHAR(255),
    IN participantLastName VARCHAR(255),
    IN linkedEventID INT
)
BEGIN
    DELETE FROM inscriptions
    WHERE name = participantFirstName
    AND lastName = participantLastName
    AND event_id = linkedEventID;
END;