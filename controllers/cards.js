const Card = require('../models/card');
const {manageErrors} = require('../erroros');

module.exports.getCard = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: card}))
    .catch(manageErrors(err));
}

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;

  Card.create({ name, link })
    .then(card => res.send({ data: card }))
    .catch(manageErrors(err));
};

module.exports.deliteCard = (req, res) => {


  Card.findByIdAndRemove(req.params.id)
    .then(card => res.send({ data: card }))
    .catch(manageErrors(err));
}


module.exports.likeCard = (req, res) =>{

Card.findByIdAndUpdate(req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },

)
.catch(manageErrors(err));}

module.exports.dislikeCard = (req, res) => {Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
.catch(manageErrors(err));}