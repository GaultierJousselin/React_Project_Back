const express = require('express');
const router = express.Router();
const axios = require("axios");

var _ = require('lodash');

API_KEY = "7fdd1065";
API_URL = "http://www.omdbapi.com/";


let movies = []



router.get('/', (req, res, next) => {
    res.status(200).json({ 
      movies: movies 
  })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const movieSelected = _.find(movies, ["id", id ]);
  console.log("id", id, movieSelected);
  res.status(200).json({ 
    message: 'Film trouvé',
    movie: movieSelected

  });


});


router.put("/", (req, res, next) => {
  const {title} = req.body;

  axios.get(`${API_URL}?t=${title}&apikey=${API_KEY}`).then(({data}) => {
    const id = _.uniqueId();
    const movie = data.Title;
    const year = data.Year;
    const runtime = data.Runtime;
    const actors = data.Actors;
    const poster = data.Poster;
    const BoxOffice = data.BoxOffice;
    const rottenTomatoes = data.Ratings[1].Value;
    const data ={"id":id, "movie":movie, "yearOfRelease": year, "duration": runtime, "actors": actors, "poster": poster, "boxOffice": BoxOffice, "rottenTomatoesScore": rottenTomatoes};
    movies.push(data)
  });
  res.status(200).json ({
    message: `Just added ${movie} to the DataBase`,
    movies
  });

  


});



router.post('/:id', (req,res) => {
  const id = req.params.id;
  const { movie } = req.body;

  const movieToUpdate = _.find(movies, ["id", id]);

  movieToUpdate.movie = movie;

  res.status(200).json ({
    message: `Hey le film ${movieToUpdate.id} a été modifié`,
    movie: movies
  });
});

//Delete specific user. 
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  lodash.remove(movies, ["id", id]);


  res.status(200).json({ 
    message: `Hey, le film #${id} a été supprimé`,
    movies: movies 
});
});

module.exports = router;

