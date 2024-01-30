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
  Card.findById(req.params.cardId).orFail()
    .then((card) => {
        card.deleteOne()
          .then(() => res.send({ card }))
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные  карточки.' })
      }
      else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден.' })
      }
      else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
        console.error(err.message);
      }
    });
}


module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).orFail()
    .then((card) => {
      return res.send({ card });

    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные  карточки.' })
      }
      else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден.' })
      }
      else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
        console.error(err.message);
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).orFail()

    .then((card) => {
       return res.send({ card });
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные  карточки.' })
      }
      else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден.' })
      }
      else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
        console.error(err.message);
      }
    });

}