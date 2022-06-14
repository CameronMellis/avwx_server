const express = require('express');
const wxservice = require('../wxservice');
const router = express.Router();

router.get('/', (req, res) => {
  var params = { data: wxservice.wxdata.data };
  res.send(params);
});

router.get('/new', (req, res) => {
  res.send('New Station');
});

module.exports = router;
