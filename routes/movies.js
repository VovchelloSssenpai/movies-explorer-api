const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createMovie,
  deleteMovieById,
  getMovies,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(30).required(),
    director: Joi.string().min(2).max(30).required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/),
    trailerLink: Joi.string().uri().required().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/),
    thumbnail: Joi.string().uri().required().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().pattern(/^[А-Яа-яёЁ\s]+$/),
    nameEN: Joi.string().required().pattern(/^[A-Za-z\s]+$/),
  }),
}), createMovie);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), deleteMovieById);

module.exports = router;
