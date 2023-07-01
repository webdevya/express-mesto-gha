const router = require('express').Router();
const {
  deleteCard, getAllCards, createCard, likeCard, dislikeCard,
} = require('../controllers/card');

router.get('/', getAllCards);

router.delete('/:cardId', deleteCard);

router.post('/', createCard);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
