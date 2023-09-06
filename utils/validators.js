const { Joi } = require('celebrate');

const signupValidator = Joi.object().keys({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(2),
});

const signinValidator = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(2),
});

const createMovieValidator = Joi.object().keys({
  country: Joi.string().required(),
  director: Joi.string().required(),
  duration: Joi.number().required(),
  year: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().uri().required().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/),
  trailerLink: Joi.string().uri().required().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/),
  thumbnail: Joi.string().uri().required().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/),
  movieId: Joi.number().required(),
  nameRU: Joi.string().required(),
  nameEN: Joi.string().required(),
});

const deleteMovieByIdValidator = Joi.object().keys({
  id: Joi.string().required().hex().length(24),
});

const updateUserValidator = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  email: Joi.string().required().email(),
});

module.exports = {
  signupValidator,
  signinValidator,
  createMovieValidator,
  deleteMovieByIdValidator,
  updateUserValidator,
};
