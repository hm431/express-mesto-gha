const StandartError = require('../errors/standartError');

module.exports.errorMiddlewares = (err, _, res, next) => {


  if (!(err.statusCode === 500)){
    res.status(err.statusCode).send(err.message);
  }
  else {
    res.status(StandartError.statusCode).send(StandartError.message);
  }

  next();
};


//ToDo fix