const express = require('express');
const app = express();
const cors = require('cors');
const wxservice = require('./wxservice');
const cron = require('node-cron');
const morgan = require('morgan');
const userRouter = require('./routes/server_routes');
const bodyParser = require('body-parser');
const { Client } = require('pg');
require('dotenv').config();
const config = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
};

async function clientConnect() {
  const client = new Client(config);
  await client.connect();
  const now = await client.query('SELECT * FROM test_1 WHERE myid = $1', [3]);
  await client.end();

  return now;
}

// Use a self-calling function so we can use async / await.

(async () => {
  const clientResult = await clientConnect();
  console.log(clientResult.rows);
})();

//Sketchy work around for dev build, fix for production

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

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
