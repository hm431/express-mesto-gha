const Card = require('../models/card');

const  badRequest = require('../errors/BadRequest')
const  notFound = require('../errors/NotFound')
const  standartError = require('../errors/standartError')




module.exports.getCard = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(standartError.statusCode).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(badRequest.statusCode).send({ message: 'Переданы некорректные данные при создании карточки.' })
      }
      else {
        res.status(standartError.statusCode).send({ message: 'Ошибка по умолчанию' });
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
        res.status(badRequest.statusCode).send({ message: 'Переданы некорректные данные  карточки.' })
      }
      else if (err.name === 'DocumentNotFoundError') {
        res.status(notFound.statusCode).send({ message: 'Пользователь по указанному _id не найден.' })
      }
      else {
        res.status(standartError.statusCode).send({ message: 'Ошибка по умолчанию' });
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
        res.status(badRequest.statusCode).send({ message: 'Переданы некорректные данные  карточки.' })
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
        res.status(badRequest.statusCode).send({ message: 'Переданы некорректные данные  карточки.' })
      }
      else if (err.name === 'DocumentNotFoundError') {
        res.status(notFound.statusCode).send({ message: 'Пользователь по указанному _id не найден.' })
      }
      else {
        res.status(standartError.statusCode).send({ message: 'Ошибка по умолчанию' });
        console.error(err.message);
      }
    });

}