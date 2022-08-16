const express = require('express');
const wxservice = require('../wxservice');
const router = express.Router();
const pool = require('../db_pools');

router.get('/weather', (req, res) => {
  console.log(req.query);
  const url = `https://avwx.rest/api/${req.query.type}/${req.query.ident}`;
  wxservice.requestAsync(url).then((response) => res.send(response));
});

router.post('/signin', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const client = await pool.getConnection();
  const response = await client.query('');

  res.send('You are signed in');
  console.log(response);
});

router.post('/signup', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const client = await pool.getConnection();
  const response = await client.query(
    'INSERT INTO users (email, password) VALUES ($1, $2)',
    [email, password]
  );

  res.send('You are signed up');
  console.log(response);
});

module.exports = router;
