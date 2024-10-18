
CREATE PROCEDURE IF NOT EXISTS `deleteEvent`(
    IN eventID INT
)
BEGIN
    DELETE FROM inscriptions WHERE event_id = eventID;
    DELETE FROM events WHERE id = eventID;
END;
