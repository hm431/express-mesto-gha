const StandartError = require('../errors/StandartError');

module.exports.errorMiddlewares = (err, _, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};





/*
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
}; */