const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  createMovie,
  deleteMovieById,
  getMovies,
} = require('../controllers/movies');
const { createMovieValidator, deleteMovieByIdValidator } = require('../utils/validators');

router.get('/', getMovies);

router.post('/', celebrate({
  body: createMovieValidator,
}), createMovie);

router.delete('/:id', celebrate({
  params: deleteMovieByIdValidator,
}), deleteMovieById);

module.exports = router;
