const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');

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
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })).then((data) => res.send(viewModelUser(data)))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(conflictErrorText, err.message));
      } else if (err instanceof mongoose.Error) {
        next(new ValidationError(validationErrorText, err.message));
      } else next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((data) => {
      if (data === null) next(new NotFoundError(notFoundText));
      res.send(viewModelUser(data));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error) {
        next(new ValidationError(validationErrorText, err.message));
      } else next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((data) => {
      if (data === null) next(new NotFoundError(notFoundText));
      res.send(viewModelUser(data));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error) {
        next(new ValidationError(validationErrorText, err.message));
      } else next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((data) => {
      if (data === null) next(new NotFoundError(notFoundText));
      res.send(viewModelUser(data));
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((data) => {
      if (data === null) next(new NotFoundError(notFoundText));
      res.send(viewModelUser(data));
    })
    .catch(next);
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send(ViewModelUserArray(data)))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!JWT_SECRET) throw new Error('JWT_SECRET not found in environment');
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
