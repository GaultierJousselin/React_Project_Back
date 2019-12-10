const mongoose = require('mongoose');

const measureSchema = new mongoose.Schema(
  {
    type: {
        type: String,
        required: true
    },
    creationDate: {
        type: String,
        required: true
    },
    sensorID: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
  },
  {
    collection: 'Measure'
  }
);

module.exports = mongoose.model('measure', measureSchema);
