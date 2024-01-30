
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getIdUsers = (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  //User.findById({userId})
  //  .then(users => res.send({ data: users}))
  User.findById(userId)
    .then((user) => {
      if (user) return res.send({ user });
      else {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден.' })
      }
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Пользователь по указанному _id не найден.' })
      }
      else {
        res.status(500).send({ message: err.message });
      }
    });

};

module.exports.createUsers = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' })
      }
      else {
        res.status(500).send({ message: err.message });
      }
    });//
};


module.exports.updateUserAbout = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  if ((name) && (about)){
  User.findByIdAndUpdate({ _id }, { name, about }, { new: true, runValidators: true, },)
    .then(user => res.send({ user }))
    .catch(err => {
      if (err.name === 'ValidationError') {

        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля. ' })
      }
      else if (err.name === 'CastError') {

        res.status(404).send({ message: 'Пользователь по указанному _id не найден.' })
      }
      else {

        res.status(500).send({ message: err.message });
      }
    });
  }
  else{
    res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля. ' });
  }
};


module.exports.updateUserAvatar = (req, res) => {
  const {avatar} = req.body;
  const { _id } = req.user;
  if (avatar){
  User.findByIdAndUpdate({ _id }, { avatar }, { new: true, runValidators: true, })
    .then(user => res.send({ data: user }))
    .catch(err => {

      if (err.name === 'ValidationError') {

        res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара. ' })
      }
      else if (err.name === 'CastError') {

        res.status(404).send({ message: 'Пользователь по указанному _id не найден.' })
      }
      else {

        res.status(500).send({ message: err.message });
      }
    });//
  }
  else{
    res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара. ' });
  }
};