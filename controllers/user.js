const User = require('../models/user');
const { execRequest } = require('./controllerBase');

const notFoundText = 'Пользователь не найден';
const validationErrorText = 'Ошибка вносимых данных для пользователя';

const viewModelUser = (data) => {
  const res = {
    name: data.name, about: data.about, avatar: data.avatar, _id: data._id,
  };
  return res;
};

module.exports.createUserViewModel = (data) => viewModelUser(data);

const ViewModelUserArray = (data) => {
  const res = data.map((user) => viewModelUser(user));
  return res;
};

module.exports.createUser = (req, res, next) => {
  execRequest(req, res, next, (x) => {
    const { name, about, avatar } = x.body;
    return User.create({ name, about, avatar });
  }, viewModelUser, notFoundText, validationErrorText);
};

module.exports.updateUser = (req, res, next) => {
  execRequest(req, res, next, (x) => {
    const { name, about } = x.body;
    return User.findByIdAndUpdate(x.user._id, { name, about }, { new: true });
  }, viewModelUser, notFoundText, validationErrorText);
};

module.exports.updateUserAvatar = (req, res, next) => {
  execRequest(req, res, next, (x) => {
    const { avatar } = x.body;
    return User.findByIdAndUpdate(x.user._id, { avatar }, { new: true });
  }, viewModelUser, notFoundText, validationErrorText);
};

module.exports.getUser = (req, res, next) => {
  execRequest(
    req,
    res,
    next,
    (x) => User.findById(x.params.userId),
    viewModelUser,
    notFoundText,
    validationErrorText,
  );
};

module.exports.getAllUsers = (req, res, next) => {
  execRequest(
    req,
    res,
    next,
    () => User.find({}),
    ViewModelUserArray,
    notFoundText,
    validationErrorText,
  );
};
