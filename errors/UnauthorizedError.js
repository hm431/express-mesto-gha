


class UnauthorizedError   extends Error { // Класс для 401 Unauthorized Error («отказ в доступе»)
  constructor(message) {
  super(message);
    this.statusCode = 500;
  }
};

module.exports =  UnauthorizedError;