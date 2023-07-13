const { Joi } = require('celebrate');

const authRule = () => Joi.object().keys({
  autorization: Joi.string().replace('Bearer ', '').token(),
});

module.exports = { authRule };
