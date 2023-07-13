const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const AuthError = require('../errors/AuthError');
const { errorHandler } = require('./errorMiddleware');

dotenv.config();
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    errorHandler(new AuthError('Необходима авторизация'), res);
    return;
  }

  if (!JWT_SECRET) errorHandler(Error('JWT_SECRET not found in environment (auth.js)'));

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    errorHandler(new AuthError('Необходима авторизация', err.message), res);
    return;
  }

  req.user = payload;

  next();
};
