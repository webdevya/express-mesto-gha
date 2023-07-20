const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
// const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');
const { dataHandler } = require('../utils/dataHandler');

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

const userDataHandler = dataHandler(viewModelUser, notFoundText);

module.exports.createUserViewModel = (data) => viewModelUser(data);

const ViewModelUserArray = (data) => {
  const res = data.map((user) => viewModelUser(user));
  return res;
};

const getUserById = (id, res, next) => {
  User.findById(id)
    .then((data) => {
      userDataHandler(res, data);
      // if (data === null) throw (new NotFoundError(notFoundText));
      // res.send(viewModelUser(data));
    })
    .catch(next);
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

const updateUserData = (req, res, next, forUpdate) => {
  User.findByIdAndUpdate(req.user._id, forUpdate, { new: true, runValidators: true })
    .then((data) => {
      userDataHandler(res, data);
      // if (data === null) throw (new NotFoundError(notFoundText));
      // res.send(viewModelUser(data));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error) {
        next(new ValidationError(validationErrorText, err.message));
      } else next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  updateUserData(req, res, next, { name, about });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUserData(req, res, next, { avatar });
};

module.exports.getCurrentUser = (req, res, next) => {
  getUserById(req.user._id, res, next);
};

module.exports.getUser = (req, res, next) => {
  getUserById(req.params.userId, res, next);
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send(ViewModelUserArray(data)))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
