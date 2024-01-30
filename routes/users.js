const router = require('express').Router();
const { getUsers, getIdUsers, createUsers, updateUserAbout, updateUserAvatar } = require('../controllers/users');

router.get('/', getUsers); //Получить данные пользователей

router.get('/:userId', getIdUsers); // Получить данные пользователя по Id

router.post('/', createUsers); // Создать нового пользователя

router.patch('/me', updateUserAbout); // Обновить профиль

router.patch('/me/avatar', updateUserAvatar); // Обновить аватар

module.exports = router;
