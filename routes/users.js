const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Station List');
  });
  
  router.get('/new', (req, res) => {
    res.send('New Station');
  });

  module.exports = router;