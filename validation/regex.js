const urlRegex = /https?:\/\/(www.)?([0-9a-z.-]+\.)[a-z]{2,}(\/[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]*)?(#$)?/i;
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/;

module.exports = { urlRegex, jwtRegex };
