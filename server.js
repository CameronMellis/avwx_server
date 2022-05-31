const express = require('express');
const app = express();

app.use(loggingMiddleware);

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/users', (req, res) => {
  res.send('Welcome to the twilight zone');
});

function loggingMiddleware(req, res, next) {
  console.log('Hi Mom');
  next();
}


app.listen(3000, () => console.log('Server Started'));
