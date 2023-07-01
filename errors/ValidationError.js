const UserError = require('./UserError');

module.exports = class ValidationError extends UserError {
  constructor(message, innerMessage) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
    this.innerMessage = innerMessage;
  }
};
