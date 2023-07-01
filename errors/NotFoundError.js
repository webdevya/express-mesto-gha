const UserError = require('./UserError');

module.exports = class NotFoundError extends UserError {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
};
