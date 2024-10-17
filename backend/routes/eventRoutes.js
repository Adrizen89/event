const express = require('express');
const { getEvents, renderEditEvent, updateEvent } = require('../controllers/eventsController');
const router = express.Router();

router.get('/events', getEvents);
router.get('/events/edit/:id', renderEditEvent);
router.post('/events/update', updateEvent);
//router.post('/create', createUser);

module.exports = router;