const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { text: 'Hello World' });
});

app.get('/users', (req, res) => {
  res.send('User List');
});

app.get('/users/new', (req, res) => {
  res.send('New User Form');
});

app.listen(3000);
