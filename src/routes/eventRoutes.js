const express = require('express');
const { getEvents, renderEditEvent, updateEvent, deleteEvent, addParticipant ,deleteParticipant } = require('../controllers/eventsController');
const router = express.Router();

router.get('/events', getEvents);
router.get('/events/edit/:id', renderEditEvent);
router.post('/events/update', updateEvent);
router.delete('/events/:id', deleteEvent);
router.post('/events/:id/participants', addParticipant);
router.delete('/events/:id/participants', deleteParticipant);

module.exports = router;