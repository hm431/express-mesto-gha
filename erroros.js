module.exports.manageErrors = (err)  => {
    if (err.name === 'SequelizeValidationError') {
      res.status(400).send({ error: 'Invalid input data' });
    } else if (err instanceof Error) {
      res.status(500).send({
        message: 'Internal server error',
        error: err
      });
    } else {
      // обработка других ошибок
      res.status(500).send({ message: 'Unknown error' });
    }
};

