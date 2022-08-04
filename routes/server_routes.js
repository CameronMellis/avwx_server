const express = require('express');
const wxservice = require('../wxservice');
const router = express.Router();

router.get('/weather', (req, res) => {
  console.log(req.query);
  const url = `https://avwx.rest/api/${req.query.type}/${req.query.ident}`;
  wxservice.requestAsync(url).then((response) => res.send(response));
});

module.exports = router;
