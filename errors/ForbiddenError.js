const UserError = require('./UserError');
const { FORBIDDEN } = require('./errorConstants');

module.exports = class ForbiddenError extends UserError {
  constructor() {
    super('Нет прав на выполнение операции');
    this.name = 'ForbiddenError';
    this.statusCode = FORBIDDEN;
  }
};
