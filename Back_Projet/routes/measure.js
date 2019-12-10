const express = require('express');
const router = express.Router();

var _ = require('lodash');

// we import our measure controller
var measure = require('../controllers/measure.controller');

let measures = []


router.get('/', (req, res, next) => {
    res.status(200).json({ 
        measures: measures 
  })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const measureSelected = _.find(measures, ["id", id ]);
  console.log("id", id, measureSelected);
  res.status(200).json({ 
    message: 'Mesure trouvée',
    measure: measureSelected
  });
});


router.put("/", (req, res, next) => {
    const {type} = req.body;
    const {creationDate} = req.body;
    const {SensorID} = req.body;
    const {value} = req.body;
    const id = _.uniqueId();
    
    //Il faut mtn l'ajouter a la mongo DB, l'étape du dessous est d'ailleurs surment inutile
    const data ={"id":id, "type":type, "creationDate": creationDate, "SensorID": SensorID, "value": value};
    measures.push(data)
  
    res.status(200).json ({
        message: `Just added ${id} to the DataBase`,
        measures
    });
});


router.post('/:id', (req,res) => {
  const id = req.params.id;
  const { measure } = req.body;

  const measureToUpdate = _.find(measures, ["id", id]);

  measureToUpdate.measure = measure;

  res.status(200).json ({
    message: `La mesure ${measureToUpdate.id} a été modifié`,
    measure: measures
  });
});


//Delete specific user. 
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    _.remove(measure, ["id", id]);

    res.status(200).json({ 
        message: `La mesure #${id} a été supprimé`,
        measures: measures 
    });
});

module.exports = router;

