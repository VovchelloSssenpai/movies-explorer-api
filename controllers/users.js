const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../utils/NotFoundError');
const AuthorizationError = require('../utils/AuthorizationError');
const { HIDDEN_KEY } = require('../utils/utils');

const getUser = (
  (req, res, next) => {
    User.findById(req.user._id)
      .orFail(() => new NotFoundError('Пользователь не найден'))
      .then((user) => { res.send(user); })
      .catch(next);
  });

const updateUser = (
  (req, res, next) => {
    const { name, email } = req.body;
    User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
      .then((user) => { if (!user) { throw new NotFoundError('Пользователь не найден'); } return res.send(user); })
      .catch(next);
  });

const createUser = (
  (req, res, next) => {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    bcrypt.hash(String(req.body.password), 10)
      .then((hashedPassword) => {
        User.create({ ...userData, password: hashedPassword })
          .then((user) => { res.status(201).send(user); })
          .catch(next);
      });
  });

const login = (
  (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email })
      .select('+password')
      .orFail(() => new AuthorizationError('Ошибка авторизации'))
      .then((user) => {
        bcrypt.compare(String(password), user.password).then((isValidUser) => {
          if (isValidUser) {
            const jwt = jsonWebToken.sign({
              _id: user._id,
            }, HIDDEN_KEY);

            res.send({ data: user.toJSON(), token: jwt });
          } else {
            next(new AuthorizationError('Ошибка авторизации'));
          }
        });
      })
      .catch(next);
  }
);

module.exports = {
  getUser,
  updateUser,
  createUser,
  login,
};
