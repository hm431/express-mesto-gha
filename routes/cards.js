const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCard, createCard, deliteCard, likeCard, dislikeCard } = require('../controllers/cards');
const {URL_REG} = require('../utils/constants');
router.get('/', getCard); //возвращает все карточки





router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required()
      .pattern(URL_REG),
  }),
}),
 createCard); //создаёт карточку

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deliteCard); //удаляет карточку по идентификатору

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard); //поставить лайк карточке

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard); // убрать лайк с карточки

module.exports = router;
