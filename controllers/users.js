
const User = require('../models/user');



const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {errorMiddlewares} = require('../middlewares/errorMiddlewares');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => {
      errorMiddlewares(err, res);
    });

};

module.exports.getIdUsers = (req, res) => {
  const { userId } = req.params;
  User.findById(userId).orFail()
    .then((user) => {
      return res.send({ user });
    })
    .catch(err => {
      errorMiddlewares(err, res);
    });

};

module.exports.createUsers = (req, res) => {
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
      errorMiddlewares(err, res);
    });
};


module.exports.updateUserAbout = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate({ _id }, { name, about }, { new: true, runValidators: true, },)
    .then(user => res.send({ user }))
    .catch(err => {
      errorMiddlewares(err, res);
    });
};


module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate({ _id }, { avatar }, { new: true, runValidators: true, })
    .then(user => res.send({ data: user }))
    .catch(err => {
      errorMiddlewares(err, res);
    });//
};


module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};