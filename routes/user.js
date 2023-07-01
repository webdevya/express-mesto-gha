const router = require('express').Router();
const {
  getUser, getAllUsers, createUser, updateUser, updateUserAvatar,
} = require('../controllers/user');

router.get('/', getAllUsers);

router.get('/:userId', getUser);

router.post('/', createUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
