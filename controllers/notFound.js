const NotFoundError = require('../errors/NotFoundError');

module.exports.notFoundFunc = (req, res, next) => next(new NotFoundError('Запрашиваемая страница не найдена'));
