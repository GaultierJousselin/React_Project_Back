const express = require('express');
const router = express.Router();

var _ = require('lodash');

// we import our measure controller
var measure = require('../controllers/measure.controller');


/* GET measures listing. */
router.get('/Humi', measure.findnumHumi);

/* GET one measure */
router.get('/Temp', measure.findnumTemp);

/* GET one measure */
router.get('/AirP', measure.findnumAirP);

module.exports = router;