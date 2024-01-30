const router = require('express').Router();
const { getCard, createCard, deliteCard, likeCard, dislikeCard} = require('../controllers/cards');

router.get('/', getCard); //возвращает все карточки

router.post('/', createCard); //создаёт карточку

router.delete('/:cardId', deliteCard); //удаляет карточку по идентификатору

router.put('/:cardId/likes', likeCard); //поставить лайк карточке

router.delete('/:cardId/likes', dislikeCard); // убрать лайк с карточки

module.exports = router;
