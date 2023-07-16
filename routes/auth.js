const router = require('express').Router();
const { celebrate } = require('celebrate');

const { createUser, login } = require('../controllers/user');
const { userRule, loginRule } = require('../validation/rules');

router.post('/signup', celebrate({ body: userRule }), createUser);

router.post('/signin', celebrate({ body: loginRule }), login);

module.exports = router;
