const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errorLogger, errorResponder } = require('./middleware/errorMiddleware');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '649f19ec3d9558be430cb9cb',
  };

  next();
});

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));
app.use('*', require('./routes/notFound'));

app.use(errorLogger);
app.use(errorResponder);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
