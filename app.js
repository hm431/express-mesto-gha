const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')

const { PORT = 3000} = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var cors = require('cors')


mongoose.connect('mongodb://localhost:27017/mestodb', {
 // useNewUrlParser: true,
 // useCreateIndex: true,
 // useFindAndModify: false
});
app.use((req, res, next) => {
  req.user = {
    _id: '65b82f8e7fec660218d8826d' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/users', require('./routes/users.js'));
app.use('/cards', require('./routes/cards.js'));




app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT);
