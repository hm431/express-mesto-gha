const jwt = require('jsonwebtoken');
const {SUPERSTRONGSECRET} = require('../utils/constants')
const UnauthorizedError = require('../errors/UnauthorizedError');
const unauthorizedError = new UnauthorizedError('Необходима авторизация')
const handleAuthError = (res) => {
  res
    .status(unauthorizedError.statusCode)
    .send({ message: unauthorizedError.message });
// next(new UnauthorizedError('Путь не найден'))
};

const extractBearerToken = (header) => {

  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, SUPERSTRONGSECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
