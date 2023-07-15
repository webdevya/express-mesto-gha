const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { execRequest } = require('./controllerBase');

const { JWT_SECRET } = require('../config');

const notFoundText = 'Пользователь не найден';
const validationErrorText = 'Ошибка вносимых данных для пользователя';
const conflictErrorText = 'Указанные данные уже существуют';

const viewModelUser = (data) => {
  const res = {
    name: data.name, about: data.about, avatar: data.avatar, _id: data._id, email: data.email,
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
    const {
      name, about, avatar, email, password,
    } = x.body;
    return bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name, about, avatar, email, password: hash,
      }));
  }, viewModelUser, notFoundText, validationErrorText, conflictErrorText);
};

module.exports.updateUser = (req, res, next) => {
  execRequest(req, res, next, (x) => {
    const { name, about } = x.body;
    return User.findByIdAndUpdate(x.user._id, { name, about }, { new: true, runValidators: true });
  }, viewModelUser, notFoundText, validationErrorText);
};

module.exports.updateUserAvatar = (req, res, next) => {
  execRequest(req, res, next, (x) => {
    const { avatar } = x.body;
    return User.findByIdAndUpdate(x.user._id, { avatar }, { new: true, runValidators: true });
  }, viewModelUser, notFoundText, validationErrorText);
};

module.exports.getCurrentUser = (req, res, next) => {
  execRequest(
    req,
    res,
    next,
    () => User.findById(req.user._id),
    viewModelUser,
    notFoundText,
    validationErrorText,
  );
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

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!JWT_SECRET) throw new Error('JWT_SECRET not found in environment');

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
