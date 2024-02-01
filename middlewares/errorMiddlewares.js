const badRequest = require('../errors/BadRequest')
const notFound = require('../errors/NotFound')
const standartError = require('../errors/standartError');

module.exports.errorMiddlewares = (err, res) => {

  console.log(err.name);
  if (err.name === 'ValidationError') {
    res.status(badRequest.statusCode).send({ message: 'Переданы некорректные данные' })
  }

  else if (err.name === 'Error'){
    res.status(badRequest.statusCode).send({ message: 'Переданы некорректные данные' })
  }
  else if  (err.code === 11000) {
    res.status(badRequest.statusCode).send({ message: 'Переданы некорректные данные' })
  }
  else if (err.name === 'DocumentNotFoundError') {
    res.status(notFound.statusCode).send({ message: 'Данные по указанному полю не найдены.' })
  }

  else if (err.name === 'CastError') {

    res.status(notFound.statusCode).send({ message: 'Данные по указанному полю не найдены.' })
  }
  else {
    res.status(standartError.statusCode).send({ message: 'Ошибка по умолчанию' });
   // console.error(err.message);
  }
};