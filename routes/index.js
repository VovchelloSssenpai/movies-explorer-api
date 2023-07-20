const router = require('express').Router();
const { celebrate } = require('celebrate');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const {
  createUser, login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/NotFoundError');
const { signupValidator, signinValidator } = require('../utils/validators');

router.post('/signup', celebrate({
  body: signupValidator,
}), createUser);

router.post('/signin', celebrate({
  body: signinValidator,
}), login);

router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.all('*', (req, res, next) => {
  next(new NotFoundError('Неверные данные'));
});

module.exports = router;
