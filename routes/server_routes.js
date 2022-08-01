const express = require('express');
const wxservice = require('../wxservice');
const router = express.Router();

router.get('/weather', (req, res) => {
  var params = { data: wxservice.wxdata.data };
  res.send(params);
});

module.exports = router;

// Save for later: for getting wxdata in json
// var params = { data: wxservice.wxdata.data };
// res.send(params);
