const Card = require('../models/card');

module.exports.getCard = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;

  Card.create({ name, link })
    .then(card => res.send({ data: card }))
    .catch(err => {
      console.log(err);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' })
      }
      else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
        console.error(err.message);
      }
    });//
};

module.exports.deliteCard = (req, res) => {
  console.log(req.params.cardId);
  Card.findById(req.params.cardId)
    .then((card) => {

      if (!card) {
        res.status(404).send({ message: 'Переданы некорректные данные  карточки.' })
      }
      else {
        console.log('ssss');
        card.deleteOne()
          .then(() => res.send({ card }))

      }
    })
    .catch(() => res.status(400).send({ message: 'Пользователь по указанному _id не найден.' }));
}


module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) return res.send({ card });
      else {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден.' })
      }
    })
    .catch(err => {
      if (err.name === 'ValidationError') {

        res.status(404).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' })
      }
      else if (err.name === 'CastError') {

        res.status(400).send({ message: 'Передан несуществующий _id карточки' })
      }
      else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
        console.error(err.message);
      }
    })
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )

    .then((card) => {
      if (card) return res.send({ card });
      else {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден.' })
      }
    })

    .catch(err => {

      if (err.name === 'ValidationError') {

        res.status(404).send({ message: 'ереданы некорректные данные для постановки/снятии лайка.' })
      }
      else if (err.name === 'CastError') {

        res.status(400).send({ message: 'Передан несуществующий _id карточки' })
      }
      else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
        console.error(err.message);
      }
    })

}