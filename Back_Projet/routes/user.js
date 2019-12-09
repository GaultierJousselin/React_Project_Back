const express = require('express');
const router = express.Router();

var _ = require('lodash');

let users = []


router.get('/', (req, res, next) => {
    res.status(200).json({ 
      users: users 
  })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const userselected = _.find(users, ["id", id ]);
  console.log("id", id, userselected);
  res.status(200).json({ 
    message: 'Utilisateur trouvé',
    user: userselected
  });
});


router.put("/", (req, res, next) => {
    const {location} = req.body;
    const {personsInHouse} = req.body;
    const {houseSize} = req.body;
    const id = _.uniqueId();
    
    //Il faut mtn l'ajouter a la mongo DB, l'étape du dessous est d'ailleurs surment inutile
    const data ={"id":id, "location": location, "personsInHouse": personsInHouse, "houseSize":houseSize};
    users.push(data)

    res.status(200).json ({
        message: `Just added user ${id} to the DataBase`,
        users
    });
});


router.post('/:id', (req,res) => {
  const id = req.params.id;
  const { user } = req.body;

  const userToUpdate = _.find(users, ["id", id]);

  userToUpdate.user = user;

  res.status(200).json ({
    message: `Le Utilisateur ${userToUpdate.id} a été modifié`,
    user: users
  });
});


//Delete specific user. 
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    _.remove(user, ["id", id]);

    res.status(200).json({ 
        message: `Le Utilisateur #${id} a été supprimé`,
        users: users 
    });
});

module.exports = router;

