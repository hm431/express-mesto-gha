const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {login, createUsers}  = require('./controllers/users.js');
const auth = require('./middlewares/auth');
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
app.post('/signin', login); // Логин пользователя
app.post('/signup', createUsers);  // Создание пользователя

app.use('/', (req, res) => {
  res.status(404).send({ message: 'Неверный путь' });
});

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT);
