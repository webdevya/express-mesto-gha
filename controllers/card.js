const Card = require('../models/card');
const { execRequest } = require('./controllerBase');
const { createUserViewModel } = require('./user');

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

module.exports.createCard = (req, res, next) => {
  execRequest(req, res, next, (x) => {
    const { name, link } = x.body;
    return Card.create({ name, link, owner: x.user._id });
  }, viewModelCard, notFoundText, validationErrorText);
};

module.exports.deleteCard = (req, res, next) => {
  execRequest(
    req,
    res,
    next,
    (x) => Card.findOneAndRemove({ _id: x.params.cardId, owner: req.user._id }),
    // findByIdAndRemove(x.params.cardId),
    viewModelCard,
    notFoundText,
    validationErrorText,
  );
};

module.exports.getAllCards = (req, res, next) => {
  execRequest(req, res, next, () => Card.find({}).populate('owner'), viewModelCardArray, notFoundText, validationErrorText);
};

module.exports.likeCard = (req, res, next) => {
  execRequest(req, res, next, (x) => Card.findByIdAndUpdate(
    x.params.cardId,
    { $addToSet: { likes: x.user._id } },
    { new: true },
  ), viewModelCard, notFoundText, validationErrorText);
};

module.exports.dislikeCard = (req, res, next) => {
  execRequest(req, res, next, (x) => Card.findByIdAndUpdate(
    x.params.cardId,
    { $pull: { likes: x.user._id } },
    { new: true },
  ), viewModelCard, notFoundText, validationErrorText);
};
