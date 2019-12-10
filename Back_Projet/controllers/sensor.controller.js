const Sensor = require('../models/sensor.model.js');

// Create and Save a new Sensor
exports.create = (req, res) => {
  // Validate request
  if (!req.body.creationDate) {
    // If creationDate is not present in body reject the request by
    // sending the appropriate http code
    return res.status(400).send({
      message: 'The creation Date can not be empty'
    });
  }

  const id = _.uniqueId();
  // Create a new Sensor
  const sensor = new Sensor({
    _id: id,
    creationDate: req.body.creationDate,
    location: req.body.location,
    userID: req.body.userID || ''
  });

  // Save Sensor in the database
  sensor
    .save()
    .then(data => {
      // we wait for insertion to be complete and we send the newly sensor integrated
      res.send(data);
    })
    .catch(err => {
      // In case of error during insertion of a new sensor in database we send an
      // appropriate message
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Sensor.'
      });
    });
};

// Retrieve and return all Sensors from the database.
exports.findAll = (req, res) => {
  Sensor.find()
    .then(sensors => {
      res.send(sensors);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving sensors.'
      });
    });
};

// Find a single Sensor with a SensorId
exports.findOne = (req, res) => {
  Sensor.findById(req.params.sensorId)
    .then(sensor => {
      if (!sensor) {
        return res.status(404).send({
          message: 'Sensor not found with id ' + req.params.sensorId
        });
      }
      res.send(sensor);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Sensor not found with id ' + req.params.sensorId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving sensor with id ' + req.params.sensorId
      });
    });
};

// Update a Sensor identified by the SensorId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.creationDate) {
    return res.status(400).send({
      message: 'creation Date can not be empty'
    });
  }

  // Find sensor and update it with the request body
  Sensor.findByIdAndUpdate(
    req.params.sensorId,
    {
        creationDate: req.body.creationDate,
        location: req.body.location,
        userID: req.body.userID || ''
    },
    { new: true }
  )
    .then(sensor => {
      if (!sensor) {
        return res.status(404).send({
          message: 'Sensor not found with id ' + req.params.sensorId
        });
      }
      res.send(sensor);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Sensor not found with id ' + req.params.sensorId
        });
      }
      return res.status(500).send({
        message: 'Error updating sensor with id ' + req.params.sensorId
      });
    });
};

// Delete a Sensor with the specified SensorId in the request
exports.delete = (req, res) => {
  Sensor.findByIdAndRemove(req.params.sensorId)
    .then(sensor => {
      if (!sensor) {
        return res.status(404).send({
          message: 'Sensor not found with id ' + req.params.sensorId
        });
      }
      res.send({ message: 'Sensor deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Sensor not found with id ' + req.params.sensorId
        });
      }
      return res.status(500).send({
        message: 'Could not delete sensor with id ' + req.params.sensorId
      });
    });
};

// Retrieve and return all Sensors from the database.
exports.findNumberSensors = (req, res) => {
  Sensor.estimatedDocumentCount()
    .then(numSensors => {
      if (!numSensors) {
        return res.status(404).send({
          message: 'Error finding the number of sensors'
        });
      }
      res.send({numSensors});
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving number of sensors.'
      });
    });
};


