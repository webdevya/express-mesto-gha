const UserError = require('./UserError');

const { UNAUTHORIZED } = require('./errorConstants');

module.exports = class AuthError extends UserError {
  constructor(message, innerMessage = '') {
    super(message);
    this.innerMessage = innerMessage;
    this.name = 'AuthError';
    this.statusCode = UNAUTHORIZED;
  }
};
