const express = require('express');
const app = express();

app.use(loggingMiddleware);

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/users', (req, res) => {
  res.send('Users Page');
});

function loggingMiddleware(req, res, next) {
  console.log('Inside loggingMiddleware');
  next();
}

app.listen(3000, () => console.log('Server Started'));
