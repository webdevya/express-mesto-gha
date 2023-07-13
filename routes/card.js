const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  deleteCard, getAllCards, createCard, likeCard, dislikeCard,
} = require('../controllers/card');

const authRule = () => Joi.object().keys({
  autorization: Joi.string().replace('Bearer ', '').token(),
});

router.get('/', celebrate({
  headers: authRule,
}), getAllCards);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
  headers: authRule,
}), deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required().uri(),
  }),
  headers: authRule,
}), createCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
  headers: authRule,
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
  headers: authRule,
}), dislikeCard);

module.exports = router;
