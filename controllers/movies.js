const Movie = require('../models/movie');
const NotFoundError = require('../utils/NotFoundError');
const LimitedAccessError = require('../utils/LimitedAccessError');

const getMovies = ((req, res, next) => {
  Movie.find({ owner: req.user._id }).then((moviesData) => res.send(moviesData))
    .catch(next);
});

const createMovie = ((req, res, next) => {
  const movieData = {
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailerLink: req.body.trailerLink,
    thumbnail: req.body.thumbnail,
    owner: req.user._id,
    movieId: req.body.movieId,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
  };

  Movie.create(movieData)
    .then((user) => res.status(201).send(user))
    .catch(next);
});

const deleteMovieById = ((req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => {
      if (req.user._id !== user.owner.toString()) {
        throw new LimitedAccessError('Неверные данные');
      }
      return Movie.findByIdAndRemove(req.params.id).then((data) => res.send(data));
    })
    .catch(next);
});

module.exports = {
  createMovie,
  deleteMovieById,
  getMovies,
};
