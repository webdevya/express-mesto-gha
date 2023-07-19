const { Joi } = require('celebrate');
const { urlRegex, jwtRegex } = require('./regex');

const stringRule = Joi.string().min(2).max(30);
const stringRuleRequired = Joi.string().required().min(2).max(30);
const urlRule = Joi.string().pattern(urlRegex);
const urlRuleRequired = Joi.string().required().pattern(urlRegex);
const idRule = Joi.string().required().hex().length(24);
const emailRule = Joi.string().required().email();
const pwdRule = Joi.string().required().min(1);

const avatarRequiredObj = { avatar: urlRuleRequired };
const avatarObj = { avatar: urlRule };
const userTextsRequiredObj = { name: stringRuleRequired, about: stringRuleRequired };
const userTextsObj = { name: stringRule, about: stringRule };
const loginObj = { email: emailRule, password: pwdRule };
const cardObj = { name: stringRuleRequired, link: urlRuleRequired };

const authRule = Joi.object().keys({
  authorization: Joi.string().replace('Bearer ', '').pattern(jwtRegex),
}).unknown();

const userRule = Joi.object().keys({ ...loginObj, ...userTextsObj, ...avatarObj });

const loginRule = Joi.object().keys(loginObj);

const userTextsRule = Joi.object().keys(userTextsRequiredObj);

const avatarRule = Joi.object().keys(avatarRequiredObj);

const userIdRule = Joi.object().keys({ userId: idRule });

const cardIdRule = Joi.object().keys({ cardId: idRule });

const cardRule = Joi.object().keys(cardObj);

module.exports = {
  authRule, userRule, loginRule, cardIdRule, cardRule, userIdRule, userTextsRule, avatarRule,
};
