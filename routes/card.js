const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  deleteCard, getAllCards, createCard, likeCard, dislikeCard,
} = require('../controllers/card');
const { urlRegex } = require('../validation/regex');
const { authRule } = require('../validation/rules');

router.get('/', celebrate({
  headers: authRule,
}), getAllCards);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
  headers: authRule,
}), deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegex),
  }),
  headers: authRule,
}), createCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
  headers: authRule,
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
  headers: authRule,
}), dislikeCard);

module.exports = router;
