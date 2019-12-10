const express = require('express');
const router = express.Router();

var _ = require('lodash');

// we import our user controller
var user = require('../controllers/user.controller');

let users = []

/* GET users listing. */
router.get('/', user.findAll);

/* GET one user */
router.get('/:userId', user.findOne);

/* create  one user */
router.put('/', user.create);

/* update  one user */
router.post('/:userId', user.update);

/* DELETE  one user */
router.delete('/:userId', user.delete);

module.exports = router;

