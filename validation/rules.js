const { Joi } = require('celebrate');
const { urlRegex } = require('./regex');

const stringRule = Joi.string().min(2).max(30);
const stringRuleRequired = Joi.string().required().min(2).max(30);
const urlRule = Joi.string().required().pattern(urlRegex);
const idRule = Joi.string().required().hex().length(24);
const emailRule = Joi.string().required().email();
const pwdRule = Joi.string().required().min(1);

const avatarObj = { avatar: urlRule };
const userTextsObj = { name: stringRuleRequired, about: stringRuleRequired };
const loginObj = { email: emailRule, password: pwdRule };
const cardObj = { name: stringRule, link: urlRule };

const authRule = Joi.object().keys({
  autorization: Joi.string().replace('Bearer ', '').token(),
});

const userRule = Joi.object().keys({ ...loginObj, ...userTextsObj, ...avatarObj });

const loginRule = Joi.object().keys(loginObj);

const userTextsRule = Joi.object().keys(userTextsObj);

const avatarRule = Joi.object().keys(avatarObj);

const userIdRule = Joi.object().keys({ userId: idRule });

const cardIdRule = Joi.object().keys({ cardId: idRule });

const cardRule = Joi.object().keys(cardObj);

module.exports = {
  authRule, userRule, loginRule, cardIdRule, cardRule, userIdRule, userTextsRule, avatarRule,
};
