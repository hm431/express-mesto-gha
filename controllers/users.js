
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const {errorMiddlewares} = require('../middlewares/errorMiddlewares');
const {SUPERSTRONGSECRET} = require('../utils/constants')
const Conflict = require('../errors/Conflict');
const BadRequest = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFound');
//const StandartError = require('../errors/StandartError');
const UnauthorizedError = require('../errors/UnauthorizedError');



module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(next);

};

module.exports.getUserInfo = (req, res, next) => {
  const { userId } = req.user;

  User.findById({_id: userId})
    .then((user) => {
       return res.send({ user });

    })
    .catch((err) => {

      if (err.name === 'DocumentNotFoundError'){
        next(new NotFound('Пользователь не найден'));
      }
     else  if (err.name === 'CastError') {
        next(new Forbidden('Передан некорректный запрос'));
      } else {
        next(err);
      }
    });

};



module.exports.getIdUsers = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId).orFail()
    .then((user) => {
       return res.send({ user });

    })
    .catch(err => {

      if (err.name === 'DocumentNotFoundError'){
        next(new NotFound('Пользователь с таким id не найден'));
      }
      else if (err.name === 'CastError') {
        next(new BadRequest('Ошибка в запросе'));
      } else {
        next(err);
      }
    });

};

module.exports.createUsers = (req, res, next) => {

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      password: hash,
      email: req.body.email,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => {
      LoginUserId  = user._id;
      res.status(201).send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,

      });
    })
    .catch(err => {

      if (err.code === 11000) {
        next(new Conflict('Неверные данные'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest('Ошибка в запросе'));
      } else {
        next(err);
      }
    });
};


module.exports.updateUserAbout = (req, res, next) => {
  const { name, about } = req.body;
  //const { id } = req.params;
  User.findByIdAndUpdate({ _id: LoginUserId }, { name, about }, { new: true, runValidators: true, })
    .then(user =>{
      res.send({ user })})
    .catch(err => {
      console.log(err);
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest('Ошибка в запросе'));
      } else {
        next(err);
      }
    });
};


module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  //const { id } = req.params;
  User.findByIdAndUpdate({ _id: LoginUserId }, { avatar }, { new: true, runValidators: true, })
    .then(user => {
      res.send({ data: user })
    })
    .catch(err => {
      console.log(err);
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest('Ошибка в запросе'));
      } else {
        next(err);
      }
    });//
};


module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User
    .findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      if (userId) {
        const token = jwt.sign( { userId },SUPERSTRONGSECRET,{ expiresIn: '7d' },);
        return res.send({ _id: token });
      }

      throw new Forbidden('Неправильные почта или пароль');
    })
    .catch((err) => {

      next(new UnauthorizedError('Путь не найден'))}
      ); //TODo
}

















