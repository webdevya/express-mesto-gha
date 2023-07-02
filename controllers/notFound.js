const NotFoundError = require('../errors/NotFoundError');

module.exports.notFoundGet = (req, res, next) => next(new NotFoundError('Запрашиваемая страница не найдена'));

module.exports.notFoundPut = (req, res, next) => next(new NotFoundError('Запрашиваемая страница не найдена'));

module.exports.notFoundPost = (req, res, next) => next(new NotFoundError('Запрашиваемая страница не найдена'));

module.exports.notFoundDelete = (req, res, next) => next(new NotFoundError('Запрашиваемая страница не найдена'));

module.exports.notFoundPatch = (req, res, next) => next(new NotFoundError('Запрашиваемая страница не найдена'));
