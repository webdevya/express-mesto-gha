const UserError = require('../errors/UserError');

module.exports.errorLogger = (error, req, res, next) => {
  console.log(`error at ${new Date()} -  ${error.name}: ${error.message}\n${error.innerMessage ?? error.innerMessage}`);
  next(error);
};

module.exports.errorResponder = (error, req, res, next) => {
  if (error instanceof UserError) {
    res.status(error.statusCode).send({ message: error.message });
    next();
  } else {
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
    next();
  }
};
