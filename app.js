const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const { errorLogger, errorResponder } = require('./middleware/errorMiddleware');
// const { createUser, login } = require('./controllers/user');
const auth = require('./middleware/auth');

dotenv.config();
// .env file temporary excluded from .gitignore for testing reason
const { PORT = 3000, DB_URL } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use('/', require('./routes/auth'));
// app.post('/signin', login);
// app.post('/signup', createUser);
app.use(auth);

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));
app.use('*', require('./routes/notFound'));

app.use(errorLogger);
app.use(errorResponder);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
