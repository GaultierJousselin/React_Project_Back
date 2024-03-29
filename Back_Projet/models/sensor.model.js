const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema(
  {
    creationDate: {
      type: String,
      required: true
    },
    location: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    }
  },
  {
    collection: 'Sensor'
  }
);

module.exports = mongoose.model('sensor', sensorSchema);
