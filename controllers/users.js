
const User = require('../models/user');

const  badRequest = require('../errors/BadRequest')
const  notFound = require('../errors/NotFound')
const  standartError = require('../errors/standartError')



module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => {
      res.status(standartError.statusCode).send({ message : 'Ошибка по умолчанию' })
      console.error(err.message);
    });

};

module.exports.getIdUsers = (req, res) => {
  const { userId } = req.params;
  User.findById(userId).orFail()
    .then((user) => {
     return res.send({ user });
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(badRequest.statusCode).send({ message: 'Пользователь по указанному _id не найден.' })
      }
      else if (err.name === 'DocumentNotFoundError') {
        res.status(notFound.statusCode).send({ message: 'Пользователь по указанному _id не найден.' })
      }
      else {
        res.status(standartError.statusCode).send({ message: 'Ошибка по умолчанию' });
        console.error(err.message);
      }
    });

};

module.exports.createUsers = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(badRequest.statusCode).send({ message: 'Переданы некорректные данные при создании пользователя.' })
      }
      else {
        res.status(standartError.statusCode).send({ message: 'Ошибка по умолчанию' });
        console.error(err.message);
      }
    });//
};


module.exports.updateUserAbout = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
    User.findByIdAndUpdate({ _id }, { name, about }, { new: true, runValidators: true, },)
      .then(user => res.send({ user }))
      .catch(err => {
        if (err.name === 'ValidationError') {

          res.status(badRequest.statusCode).send({ message: 'Переданы некорректные данные при обновлении профиля. ' })
        }
        else if (err.name === 'CastError') {

          res.status(notFound.statusCode).send({ message: 'Передан не корректный ID' })
        }
        else {

          res.status(standartError.statusCode).send({ message: 'Ошибка по умолчанию' });
          console.error(err.message);
        }
      });
};


module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
    User.findByIdAndUpdate({ _id }, { avatar }, { new: true, runValidators: true, })
      .then(user => res.send({ data: user }))
      .catch(err => {

        if (err.name === 'ValidationError') {

          res.status(badRequest.statusCode).send({ message: 'Переданы некорректные данные при обновлении аватара. ' })
        }
        else if (err.name === 'CastError') {

          res.status(notFound.statusCode).send({ message: 'Пользователь по указанному _id не найден.' })
        }
        else {

          res.status(standartError.statusCode).send({ message: 'Ошибка по умолчанию' });
          console.error(err.message);
        }
      });//
  };