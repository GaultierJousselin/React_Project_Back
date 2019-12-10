const express = require('express');
const router = express.Router();

var _ = require('lodash');

// we import our sensor controller
var sensor = require('../controllers/sensor.controller');


/* GET number of sensors */
router.get('/', sensor.findNumberSensors);

module.exports = router;