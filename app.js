const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {login, createUsers}  = require('./controllers/users.js');
const auth = require('./middlewares/auth');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
//const createUser = require('./controllers/users.js');


var cors = require('cors')
//const { errors } = require('celebrate');

const { PORT = 3000} = process.env;
const mongobd = 'mongodb://localhost:27017/mestodb';
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var cors = require('cors')


mongoose.connect(mongobd, {
 // useNewUrlParser: true,
 // useCreateIndex: true,
 // useFindAndModify: false
});



app.use('/users', auth, require('./routes/users.js'));
app.use('/cards', auth, require('./routes/cards.js'));


app.post('/signin',celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login); // Логин пользователя



app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi
      .string()
      .pattern(new RegExp(/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/)),
  }),}), createUsers);  // Создание пользователя

app.use('/', (req, res) => {
  res.status(404).send({ message: 'Неверный путь' });
});
app.use(errors());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT);
