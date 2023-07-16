const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  deleteCard, getAllCards, createCard, likeCard, dislikeCard,
} = require('../controllers/card');

const { authRule, cardIdRule, cardRule } = require('../validation/rules');

router.get('/', celebrate({ headers: authRule }), getAllCards);

router.delete('/:cardId', celebrate({
  params: cardIdRule,
  headers: authRule,
}), deleteCard);

router.post('/', celebrate({
  body: cardRule,
  headers: authRule,
}), createCard);

router.put('/:cardId/likes', celebrate({
  params: cardIdRule,
  headers: authRule,
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: cardIdRule,
  headers: authRule,
}), dislikeCard);

module.exports = router;
