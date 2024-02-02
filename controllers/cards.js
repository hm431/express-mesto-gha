const Card = require('../models/card');

//const Conflict = require('../errors/Conflict');
const BadRequest = require('../errors/NotFound');
//const Forbidden = require('../errors/Forbidden');
//const NotFound = require('../errors/NotFound');
//const StandartError = require('../errors/StandartError');
//const UnauthorizedError = require('../errors/UnauthorizedError');
var {LoginUserId} = require('./users');



module.exports.getCard = (req, res, next) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => errorMiddlewares(err, res)
    );
};

module.exports.createCard = (req, res, next) => {
 // console.log(req.user);
  const { name, link } = req.body;

 // const { userId } = req.params;

  Card.create({ name, link, owner: LoginUserId })
    .then(card => res.send({ data: card }))
    .catch(err => {
      console.log(err);
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
 // const { userId } = req.params;
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: LoginUserId } }, // добавить _id в массив, если его там нет
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
  const { userId } = req.params;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } }, // убрать _id из массива
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