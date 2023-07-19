const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUser, getCurrentUser, getAllUsers, updateUser, updateUserAvatar,
} = require('../controllers/user');
const {
  authRule, userIdRule, userTextsRule, avatarRule,
} = require('../validation/rules');

router.get('/', getAllUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({ params: userIdRule }), getUser);

router.patch('/me', celebrate({
  body: userTextsRule,
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: avatarRule,
  headers: authRule,
}), updateUserAvatar);

module.exports = router;
// headers: authRule,
