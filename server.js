const express = require('express');
const app = express();
const cors = require('cors');
const wxservice = require('./wxservice');
const cron = require('node-cron');
const userRouter = require('./routes/server_routes');
const bodyParser = require('body-parser');

//Sketchy work around for dev build, fix for production

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(userRouter);

wxservice.getData().then(() => {
  app.listen(3001);
});

// cron currently updating wxdata every hour, extra requests saved for manual updating

cron.schedule(
  '0 * * * *',
  () => {
    wxservice.getData();
    console.log('getting new weather every hour');
  },
  {
    scheduled: true,
    timezone: 'UTC',
  }
);
