const NotFoundError = require('../errors/NotFoundError');

function dataHandler(viewModel, notFoundText) {
  const handler = (res, data) => {
    if (data === null) throw (new NotFoundError(notFoundText));
    res.send(viewModel(data));
  };
  return handler;
}

module.exports = { dataHandler };
