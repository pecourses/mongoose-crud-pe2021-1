const express = require('express');
const router = require('./router');
const app = express();

app.use(express.json());

app.use('/api', router);

// advanced: вынести обработчик ошибок в миддлвар
// и добавить обработчик монгусовских ошибок
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return;
  }
  res
    .status(err?.status ?? 500)
    .send({ errors: [{ title: err?.message ?? 'Internal server error' }] });
});

module.exports = app;
