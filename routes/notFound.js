const router = require('express').Router();
const {
  notFoundGet, notFoundPut, notFoundPost, notFoundPatch, notFoundDelete,
} = require('../controllers/notFound');

router.get('/', notFoundGet);

router.put('/', notFoundPut);

router.post('/', notFoundPost);

router.patch('/', notFoundPatch);

router.delete('/', notFoundDelete);
