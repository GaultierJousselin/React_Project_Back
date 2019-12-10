const express = require('express');
const router = express.Router();

var _ = require('lodash');

// we import our measure controller
var measure = require('../controllers/measure.controller');

let measures = []

/* GET measures listing. */
router.get('/', measure.findAll);

/* GET one measure */
router.get('/:measureId', measure.findOne);

/* create  one measure */
router.put('/', measure.create);

/* update  one measure */
router.post('/:measureId', measure.update);

/* DELETE  one measure */
router.delete('/:measureId', measure.delete);

module.exports = router;