const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  updateUser, getUser,
} = require('../controllers/users');
const { updateUserValidator } = require('../utils/validators');

router.get('/me', getUser);

router.patch('/me', celebrate({
  body: updateUserValidator,
}), updateUser);

module.exports = router;
