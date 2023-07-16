const router = require('express').Router();
const { errors } = require('celebrate');
const auth = require('../middleware/auth');

router.use('/', require('./auth'));

router.use(errors());
router.use(auth);

router.use('/users', require('./user'));
router.use('/cards', require('./card'));

router.use('*', require('./notFound'));
