const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, getCurrentUser, getAllUsers, updateUser, updateUserAvatar,
} = require('../controllers/user');
const { urlRegex } = require('../validation/regex');

router.get('/', getAllUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUser);

// router.post('/', createUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlRegex),
  }),
}), updateUserAvatar);

module.exports = router;
