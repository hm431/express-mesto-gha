const badRequest = require('../errors/BadRequest')
const notFound = require('../errors/NotFound')
const standartError = require('../errors/standartError');

module.exports.errorMiddlewares = (err, res) => {

  console.log(err);
  if (err.name === 'ValidationError') {
    res.status(badRequest.statusCode).send({ message: 'Переданы некорректные данные' })
  }
  else if (err.message === 'EmailDosentExist'){
    res.status(401).send({ message: 'Неправильные почта или пароль' })
  }
  else if (err.message === 'InvalidEmail'){
    res.status(400).send({ message: 'Неправильные почта или пароль' })
  }
  else if (err.name === 'Error'){
    res.status(badRequest.statusCode).send({ message: 'Переданы некорректные данные' })
  }
  else if  (err.code === 11000) {
    res.status(409).send({ message: 'Переданы некорректные данные' })
  }
  else if (err.name === 'DocumentNotFoundError') {
    res.status(notFound.statusCode).send({ message: 'Данные по указанному полю не найдены.' })
  }

  else if (err.name === 'CastError') {

    res.status(notFound.statusCode).send({ message: 'Данные по указанному полю не найдены.' })
  }


  else {
    res.status(standartError.statusCode).send({ message: 'На сервере произошла ошибка' });
   // console.error(err.message);
  }
};