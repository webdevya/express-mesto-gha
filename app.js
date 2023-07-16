const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { errorLogger, errorResponder } = require('./middleware/errorMiddleware');
const auth = require('./middleware/auth');

const { PORT, DB_URL } = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

// app.use('/', require('./routes/index'));

app.use('/', require('./routes/auth'));

app.use(errors());
app.use(auth);

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));
app.use('*', require('./routes/notFound'));

app.use(errors());
app.use(errorLogger);
app.use(errorResponder);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
