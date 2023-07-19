const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const {
  createUser, login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/NotFoundError');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(2),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(2),
  }),
}), login);

router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.all('*', (req, res, next) => {
  next(new NotFoundError('Неверные данные'));
});

module.exports = router;
