const jwt = require('jsonwebtoken');
const AuthorizationError = require('../utils/AuthorizationError');
const { HIDDEN_KEY } = require('../utils/utils');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    let payload;
    const token = authorization.replace('Bearer ', '');
    try {
      payload = jwt.verify(token, HIDDEN_KEY);
    } catch (err) {
      return next(new AuthorizationError('Ошибка авторизации'));
    }

    req.user = payload;
    return next();
  } return next(new AuthorizationError('Ошибка авторизации'));
};

module.exports = auth;
