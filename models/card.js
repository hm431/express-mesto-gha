const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
// напишите код здесь
const cardSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  about: {
    type: String, // имя — это строка
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
 likes: [{
    type: ObjectId,
    ref: 'user',
    default: [],
    required: true,
  }],
  createdAt:{
    type: Date,
    default: Date.now,
  }
});


module.exports = mongoose.model('card', cardSchema);