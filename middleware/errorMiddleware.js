const UserError = require('../errors/UserError');
const { INTERNAL_SERVER_ERROR } = require('../errors/errorConstants');

const errorLoggerHandler = (error) => {
  console.log(`error at ${new Date()} -  ${error.name}: ${error.message}\n${error.innerMessage ?? error.innerMessage}`);
};

const errorResponderHandler = (error, res) => {
  if (error instanceof UserError) {
    res.status(error.statusCode).send({ message: error.message });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

module.exports.errorLogger = (error, req, res, next) => {
  errorLoggerHandler(error);
  next(error);
};

module.exports.errorResponder = (error, req, res, next) => {
  errorResponderHandler(error, res);
  next();
};

module.exports.errorHandler = (error, res) => {
  errorLoggerHandler(error);
  errorResponderHandler(error, res);
};
