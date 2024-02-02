const StandartError = require('../errors/standartError');
const standartError = new StandartError('На сервере произошла ошибка')
module.exports.errorMiddlewares = (err, _, res, next) => {

  const statusCode = err.statusCode || standartError.statusCode;

  const message = statusCode === standartError.statusCode ? standartError.message : err.message;
  res.status(statusCode).send({ message });
  next();
};


//ToDo fix