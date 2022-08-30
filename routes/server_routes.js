const express = require('express');
const wxservice = require('../wxservice');
const router = express.Router();
const pool = require('../db_pools');
const saltHash = require('password-salt-and-hash');
const userExists = require('../user_exists');
const generateAccessToken = require('../generate_token');
const validateToken = require('../validate_token');

router.get('/weather', validateToken,(req, res) => {
  console.log(req.query);
  const url = `https://avwx.rest/api/${req.query.type}/${req.query.ident}`;
  wxservice.requestAsync(url).then((response) => res.send(response));
});

router.post('/signin', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const client = await pool.getConnection();
  const token = generateAccessToken(email);
  const response = await client.query(
    'SELECT password FROM users WHERE email = $1',
    [email]
  );
  let result = response.rows[0];
  let parsed = JSON.parse(result.password);
  let salt = parsed.salt;
  let hashed = parsed.password;

  let isPasswordMatch = saltHash.verifySaltHash(salt, hashed, password);
  if (isPasswordMatch === false) {
    res.status(400).send('Invalid credentials');
  } else {
    res.status(200).json({
      token: `Bearer ${token}`,
    });
    console.log(token);
  }
});

router.post('/signup', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const hashPassword = saltHash.generateSaltHash(password);
  const client = await pool.getConnection();
  if (await userExists(client, email)) {
    res.status(400).send('User already exists!');
  } else {
    const response = await client.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, hashPassword]
    );
    res.status(200).send('Success');
  }
});

module.exports = router;
