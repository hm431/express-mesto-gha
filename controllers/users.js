
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users}))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getIdUsers = (req, res) =>{
  const {userId} = req.params;
  console.log(userId);
  //User.findById({userId})
  //  .then(users => res.send({ data: users}))
  User.findById(userId)
  .then((user) => {
    if (user) return res.send({ user });
    else {
      res.status(404).send({message: 'Пользователь по указанному _id не найден.'})
    }
  })
    .catch(err => {
      if (err.name === 'CastError'){
        res.status(400).send({message: 'Пользователь по указанному _id не найден.'})
      }
      else{
        res.status(500).send({ message: err.message });
      }
  });

};

module.exports.createUsers = (req, res) => {
  const { name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then(user => res.send({ data: user }))
    .catch(err => {
        if (err.name === 'ValidationError'){
          res.status(400).send({message: 'Переданы некорректные данные при создании пользователя.'})
        }
        else{
          res.status(500).send({ message: err.message });
        }
    });//
};


module.exports.updateUserAbout =  (req, res) => {
  const { name, about} = req.body;
  const {_id} = req.user;
  User.findByIdAndUpdate({_id}, {name, about})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};


module.exports.updateUserAvatar = (req, res) => {
  const {_id, avatar} = req.body;
  User.findByIdAndUpdate({_id}, {avatar})
    .then(user => res.send({ data: user }))
    .catch(err => {

      if (err.name === 'ValidationError'){

        res.status(400).send({message: 'Переданы некорректные данные при обновлении аватара. '})
      }
      else if (err.name === 'CastError'){

        res.status(404).send({message: 'Пользователь по указанному _id не найден.'})
      }
      else{

        res.status(500).send({ message: err.message });
      }
  });//
};