const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {errorMiddlewares} = require('../middlewares/errorMiddlewares');

// напишите код здесь
const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    default: 'Жак-Ив Кусто',
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  about: {
    type: String, // имя — это строка
    default: 'Исследователь',
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (avatar) => /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/.test(avatar),
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => /.+@.+\..+/.test(email),
      message: 'Требуется ввести электронный адрес',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});


userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({email})
    .then((user) => {

      if (!email){
        return Promise.reject(new Error('InvalidEmail'));
      }
      if (!user) {
        console.log('Pomogitre');
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)

        .then((matched) => {

          if (!matched) {
            console.log('Pomogitre');
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    })
//   .catch((err) => {
//      errorMiddlewares(err);
//    })
};

module.exports = mongoose.model('user', userSchema);