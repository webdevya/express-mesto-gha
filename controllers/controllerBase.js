const mongoose = require('mongoose');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

module.exports.execRequest = (
  req,
  res,
  next,
  promiseFunc,
  viewModelFunc,
  notFoundText,
  validationErrorText,
) => {
  promiseFunc(req)
    .then((data) => {
      if (data === null) return Promise.reject(new NotFoundError(notFoundText));
      return res.send(viewModelFunc(data));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error) {
        next(new ValidationError(validationErrorText, err.message));
      } else next(err);
    });
};
