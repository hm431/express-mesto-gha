const Card = require('../models/card');

//const Conflict = require('../errors/Conflict');
const BadRequest = require('../errors/NotFound');
//const Forbidden = require('../errors/Forbidden');
//const NotFound = require('../errors/NotFound');
//const StandartError = require('../errors/StandartError');
//const UnauthorizedError = require('../errors/UnauthorizedError');




module.exports.getCard = (req, res, next) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => errorMiddlewares(err, res)
    );
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('z'));
      } else {
        next(err);
      }

    });//
};

module.exports.deliteCard = (req, res, next) => {
  console.log(req.params.cardId);
  Card.findById(req.params.cardId).orFail()
    .then((card) => {
        card.deleteOne()
          .then(() => res.send({ card }))
    })
    .catch(next);
}


module.exports.likeCard = (req, res, next) => {

  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).orFail()
    .then((card) => {
      return res.send({ card });

    })
    .catch((err) => {

      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        next(new BadRequest('z'));
      } else {
        next(err);
      }

    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).orFail()

    .then((card) => {
       return res.send({ card });
    })

    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        next(new BadRequest('z'));
      } else {
        next(err);
      }
    });

}