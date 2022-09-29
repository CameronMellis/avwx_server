const express = require('express');
const app = express();
// const cors = require('cors');
const wxservice = require('./wxservice');
const cron = require('node-cron');
const userRouter = require('./routes/server_routes');
const bodyParser = require('body-parser');
// const path = require('path');
// const https = require('https');
// const fs = require('fs');
const port = process.env.PORT || 3000;

//Sketchy work around for dev build, fix for production

// app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(userRouter);

// add middleware for static server

// app.use(express.static(path.join(__dirname, 'dist')));
// console.log(path.join(__dirname, 'dist'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log('Server is running on port 3000');
});

// https
//   .createServer(
//     // Provide the private and public key to the server by reading each
//     // file's content with the readFileSync() method.
//     {
//       key: fs.readFileSync('key.pem'),
//       cert: fs.readFileSync('cert.pem'),
//     },
//     app
//   )
//   .listen(3001, () => {
//     wxservice.getData();
//   });

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
