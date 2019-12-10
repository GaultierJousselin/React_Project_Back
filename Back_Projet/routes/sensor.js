const express = require('express');
const router = express.Router();

var _ = require('lodash');

// we import our sensor controller
var sensor = require('../controllers/sensor.controller');

let sensors = []

/* GET sensors listing. */
router.get('/', sensor.findAll);

/* GET one sensor */
router.get('/:sensorId', sensor.findOne);

/* create  one sensor */
router.put('/', sensor.create);

/* update  one sensor */
router.post('/:sensorId', sensor.update);

/* DELETE  one sensor */
router.delete('/:sensorId', sensor.delete);

module.exports = router;