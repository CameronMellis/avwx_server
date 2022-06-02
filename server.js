const express = require('express');
const app = express();
const request = require('request');

app.set('views', './views');
app.set('view engine', 'ejs');

request(
  {
    method: 'GET',
    url: 'https://avwx.rest/api/metar/YYT',
    headers: {
      Authorization: 'dB2w9VHe5mzuqKLgd9Slf5RyIg5jUv3mNV5DyWJpY4s',
    },
  },
  function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
  }
);

app.get('/', (req, res) => {
  res.render('index', { text: 'Can you hear me now?' });
});

const userRouter = require('./routes/users');

app.use('/users', userRouter);

app.listen(3000);
