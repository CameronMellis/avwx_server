const express = require('express');
const app = express();
const wxservice = require('./wxservice');
const cron = require('node-cron');

const userRouter = require('./routes/stations');

app.use(userRouter);

wxservice.getData().then(() => {
  app.listen(3000);
});

cron.schedule(
  '*/30 * * * *',
  () => {
    wxservice.getData();
    console.log('getting new weather every half hour');
  },
  {
    scheduled: true,
    timezone: 'UTC',
  }
);
