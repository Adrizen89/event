const express = require('express');
const { getEvents, renderEditEvent, updateEvent, deleteEvent, deleteParticipant } = require('../controllers/eventsController');
const router = express.Router();

router.get('/events', getEvents);
router.get('/events/edit/:id', renderEditEvent);
router.post('/events/update', updateEvent);
router.delete('/events/:id', deleteEvent);
router.delete('/events/:id/participants', deleteParticipant);
//router.post('/create', createUser);

module.exports = router;