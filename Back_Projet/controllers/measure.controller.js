const Measure = require('../models/measure.model.js');

// Create and Save a new Measure
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    // If type is not present in body reject the request by
    // sending the appropriate http code
    return res.status(400).send({
      message: 'The creation Date can not be empty'
    });
  }

  const id = _.uniqueId();
  // Create a new Measure
  const measure = new Measure({
    _id: id,
    type: req.body.type,
    creationDate: req.body.creationDate,
    sensorID: req.body.sensorID,
    value: req.body.value || ''
  });

  // Save Measure in the database
  measure
    .save()
    .then(data => {
      // we wait for insertion to be complete and we send the newly measure integrated
      res.send(data);
    })
    .catch(err => {
      // In case of error during insertion of a new measure in database we send an
      // appropriate message
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Measure.'
      });
    });
};

// Retrieve and return all Measures from the database.
exports.findAll = (req, res) => {
  Measure.find()
    .then(measures => {
      res.send(measures);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving measures.'
      });
    });
};

// Find a single Measure with a MeasureId
exports.findOne = (req, res) => {
  Measure.findById(req.params.measureId)
    .then(measure => {
      if (!measure) {
        return res.status(404).send({
          message: 'Measure not found with id ' + req.params.measureId
        });
      }
      res.send(measure);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Measure not found with id ' + req.params.measureId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving measure with id ' + req.params.measureId
      });
    });
};

// Update a Measure identified by the MeasureId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.type) {
    return res.status(400).send({
      message: 'creation Date can not be empty'
    });
  }

  // Find measure and update it with the request body
  Measure.findByIdAndUpdate(
    req.params.measureId,
    {
        type: req.body.type,
        creationDate: req.body.creationDate,
        sensorID: req.body.sensorID,
        value: req.body.value || ''
    },
    { new: true }
  )
    .then(measure => {
      if (!measure) {
        return res.status(404).send({
          message: 'Measure not found with id ' + req.params.measureId
        });
      }
      res.send(measure);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Measure not found with id ' + req.params.measureId
        });
      }
      return res.status(500).send({
        message: 'Error updating measure with id ' + req.params.measureId
      });
    });
};

// Delete a Measure with the specified MeasureId in the request
exports.delete = (req, res) => {
  Measure.findByIdAndRemove(req.params.measureId)
    .then(measure => {
      if (!measure) {
        return res.status(404).send({
          message: 'Measure not found with id ' + req.params.measureId
        });
      }
      res.send({ message: 'Measure deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Measure not found with id ' + req.params.measureId
        });
      }
      return res.status(500).send({
        message: 'Could not delete measure with id ' + req.params.measureId
      });
    });
};

// Retrieve and return the number of Humidity measures.
exports.findnumHumi = (req, res) => {
  Measure.countDocuments({type: "humidity"})
    .then(numHumidity => {
      if (!numHumidity) {
        return res.status(404).send({
          message: 'Error finding the number of sensors'
        });
      }
      res.send({numHumidity});
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving number of sensors.'
      });
    });
};


// Retrieve and return the number of Temperature measures.
exports.findnumTemp = (req, res) => {
  Measure.countDocuments({type: "temperature"})
    .then(numTemperature => {
      if (!numTemperature) {
        return res.status(404).send({
          message: 'Error finding the number of sensors'
        });
      }
      res.send({numTemperature});
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving number of sensors.'
      });
    });
};

// Retrieve and return the number of AirPollution measures.
exports.findnumAirP = (req, res) => {
  Measure.countDocuments({type: "airPollution"})
    .then(numAirP => {
      if (!numAirP) {
        return res.status(404).send({
          message: 'Error finding the number of sensors'
        });
      }
      res.send({numAirP});
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving number of sensors.'
      });
    });
};