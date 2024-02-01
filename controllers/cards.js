const Card = require('../models/card');






module.exports.getCard = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => errorMiddlewares(err, res)
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(err => {
      errorMiddlewares(err, res);

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
      errorMiddlewares(err, res);

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
      errorMiddlewares(err, res);

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
      errorMiddlewares(err, res);
    });

}