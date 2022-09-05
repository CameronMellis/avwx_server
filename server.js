const express = require('express');
const app = express();
const cors = require('cors');
const wxservice = require('./wxservice');
const cron = require('node-cron');
const userRouter = require('./routes/server_routes');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

//Sketchy work around for dev build, fix for production

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(userRouter);

https
  .createServer(
    // Provide the private and public key to the server by reading each
    // file's content with the readFileSync() method.
    {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
    },
    app
  )
  .listen(3001, () => {
    wxservice.getData();
  });

// wxservice.getData().then(() => {
//   app.listen(3001);
// });

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
