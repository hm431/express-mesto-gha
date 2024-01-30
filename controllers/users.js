const {manageErrors} = require('../erroros');

const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users}))
    .catch(manageErrors(err));
};

module.exports.getIdUsers = (req, res) =>{
  const {_id} = req.body;
  User.findById({_id})
    .then(users => res.send({ data: users}))
    .catch(manageErrors(err));
};

module.exports.createUsers = (req, res) => {
  const { name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then(user => res.send({ data: user }))
    .catch(manageErrors(err));
};


module.exports.updateUserAbout =  (req, res) => {
  const {_id, about} = req.body;
  User.findByIdAndUpdate({_id}, {about})
    .then(user => res.send({ data: user }))
    .catch(manageErrors(err));
};


module.exports.updateUserAvatar = (req, res) => {
  const {_id, avatar} = req.body;
  User.findByIdAndUpdate({_id}, {avatar})
    .then(user => res.send({ data: user }))
    .catch(manageErrors(err));
};