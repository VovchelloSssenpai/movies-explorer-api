const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'Invalid link URL',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'Invalid link URL',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'Invalid link URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    match: [/^[А-Яа-яёЁ\s]+$/, 'Название фильма должно быть на русском'],
  },
  nameEN: {
    type: String,
    required: true,
    match: [/^[A-Za-z\s]+$/, 'Название фильмы должго быть на английском'],
  },
});
module.exports = mongoose.model('movie', movieSchema);
