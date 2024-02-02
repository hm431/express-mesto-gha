const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getIdUsers,  updateUserAbout, updateUserAvatar, getUserInfo } = require('../controllers/users');


router.get('/', getUsers); //Получить данные пользователей


router.get('/me', getUserInfo);

router.get('/:userId',celebrate({
  params: Joi.object().keys({
    userId: Joi.string()
    .length(24)
    .required(),
  }),
}), getIdUsers); // Получить данные пользователя по Id



router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}),  updateUserAbout); // Обновить профиль

router.patch('/me/avatar', celebrate({
  params: Joi.object().keys({
    avatar: Joi.string().required()
    .pattern(new RegExp(/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/)),
  }),
}),updateUserAvatar); // Обновить аватар

module.exports = router;

