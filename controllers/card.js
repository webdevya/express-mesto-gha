const mongoose = require('mongoose');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const Card = require('../models/card');
const { createUserViewModel } = require('./user');
const { dataHandler } = require('../utils/dataHandler');

const notFoundText = 'Карточка не найдена';
const validationErrorText = 'Ошибка вносимых данных для карточки';

const viewModelCard = (data) => {
  const res = {
    likes: data.likes,
    _id: data._id,
    name: data.name,
    link: data.link,
    owner: createUserViewModel(data.owner),
    createdAt: data.createdAt,
  };
  return res;
};

const viewModelCardArray = (data) => {
  const res = data.map((card) => viewModelCard(card));
  return res;
};

const cardDataHandler = dataHandler(viewModelCard, notFoundText);

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id }).then((data) => {
    res.send(viewModelCard(data));
  })
    .catch((err) => {
      if (err instanceof mongoose.Error) {
        next(new ValidationError(validationErrorText, err.message));
      } else next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId).then((crd) => {
    if (!crd) throw (new NotFoundError(notFoundText));
    if (!crd.owner._id.equals(req.user._id)) throw (new ForbiddenError());
    return crd.deleteOne();
  }).then((del) => res.send(del))
    .catch(next);
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({}).populate('owner').then((data) => {
    res.send(viewModelCardArray(data));
  })
    .catch((err) => {
      if (err instanceof mongoose.Error) {
        next(new ValidationError(validationErrorText, err.message));
      } else next(err);
    });
};

const setLike = (req, res, next, optionObj) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    optionObj,
    { new: true },
  ).then((data) => {
    cardDataHandler(res, data);
    // if (data === null) throw (new NotFoundError(notFoundText));
    // res.send(viewModelCard(data));
  })
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => {
  setLike(req, res, next, { $addToSet: { likes: req.user._id } });
};

module.exports.dislikeCard = (req, res, next) => {
  setLike(req, res, next, { $pull: { likes: req.user._id } });
};
