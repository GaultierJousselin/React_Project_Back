const express = require('express');
const router = express.Router();

var _ = require('lodash');

// we import our sensor controller
var sensor = require('../controllers/sensor.controller');

let sensors = []


router.get('/', (req, res, next) => {
    res.status(200).json({ 
      sensors: sensors 
  })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const sensorselected = _.find(sensors, ["id", id ]);
  console.log("id", id, sensorselected);
  res.status(200).json({ 
    message: 'Capteur trouvé',
    sensor: sensorselected
  });
});


router.put("/", (req, res, next) => {
    const {creationDate} = req.body;
    const {location} = req.body;
    const {userID} = req.body;
    const id = _.uniqueId();
    
    //Il faut mtn l'ajouter a la mongo DB, l'étape du dessous est d'ailleurs surment inutile
    const data ={"id":id, "creationDate": creationDate, "location": location, "userID":userID};
    sensors.push(data)

    res.status(200).json ({
        message: `Just added sensor ${id} to the DataBase`,
        sensors
    });
});


router.post('/:id', (req,res) => {
  const id = req.params.id;
  const { sensor } = req.body;

  const sensorToUpdate = _.find(sensors, ["id", id]);

  sensorToUpdate.sensor = sensor;

  res.status(200).json ({
    message: `Le Capteur ${sensorToUpdate.id} a été modifié`,
    sensor: sensors
  });
});


//Delete specific user. 
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    _.remove(sensor, ["id", id]);

    res.status(200).json({ 
        message: `Le Capteur #${id} a été supprimé`,
        sensors: sensors 
    });
});

module.exports = router;

