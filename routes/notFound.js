const router = require('express').Router();
const { notFoundFunc } = require('../controllers/notFound');

router.get('/', notFoundFunc);

router.put('/', notFoundFunc);

router.post('/', notFoundFunc);

router.patch('/', notFoundFunc);

router.delete('/', notFoundFunc);

module.exports = router;
