const router = require('express').Router();
const { notFoundFunc } = require('../controllers/notFound');

router.all('/', notFoundFunc);

module.exports = router;
