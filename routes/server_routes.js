const express = require('express');
const wxservice = require('../wxservice');
const router = express.Router();

router.get('/weather', (req, res) => {
  console.log(req.query);
  const url = `https://avwx.rest/api/${req.query.type}/${req.query.ident}`;
  wxservice.requestAsync(url).then((response) => res.send(response));
});

router.post('/signin', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  res.send('You are signed in');
  console.log(email, password);
});

router.post('/signup', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  res.send('You are signed up');
  console.log(email, password);
});

module.exports = router;
