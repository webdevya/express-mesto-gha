const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть только имя
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: { // у пользователя есть только имя
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: { // у пользователя есть только имя
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
