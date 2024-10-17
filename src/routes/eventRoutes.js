const express = require('express');
const { getEvents } = require('../controllers/eventsController');
const router = express.Router();

router.get('/events', getEvents);
//router.post('/create', createUser);

module.exports = router;