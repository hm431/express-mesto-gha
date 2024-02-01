
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const {errorMiddlewares} = require('../middlewares/errorMiddlewares');

const Conflict = require('../errors/Conflict');
const BadRequest = require('../errors/NotFound');
//const Forbidden = require('../errors/Forbidden');
//const NotFound = require('../errors/NotFound');
//const StandartError = require('../errors/StandartError');
const UnauthorizedError = require('../errors/UnauthorizedError');


module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(next);

};

module.exports.getIdUsers = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId).orFail()
    .then((user) => {
      return res.send({ user });
    })
    .catch(err => {
      if (err.name === 'CastError') {
        next(new BadRequest(''));
      } else {
        next(err);
      }
    });

};

module.exports.createUsers = (req, res, next) => {
  // const { name, about, avatar, email, password} = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      password: hash,
      email: req.body.email,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar
      });
    })
    .catch(err => {
      if (err.code === 11000) {
        next(new Conflict(''));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest(''));
      } else {

        next(err);
      }
    });
};


module.exports.updateUserAbout = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate({ _id }, { name, about }, { new: true, runValidators: true, },)
    .then(user => res.send({ user }))
    .catch(err => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest('я'));
      } else {
        next(err);
      }
    });
};


module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate({ _id }, { avatar }, { new: true, runValidators: true, })
    .then(user => res.send({ data: user }))
    .catch(err => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные при обновлении профиля пользователя'));
      } else {
        next(err);
      }
    });//
};


module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
      });
      throw new UnauthorizedError('Неправильные почта или пароль');
    })
    .catch(next);
};