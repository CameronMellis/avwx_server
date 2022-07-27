const express = require('express');
const app = express();
const wxservice = require('./wxservice');
const cron = require('node-cron');
const userRouter = require('./routes/stations');
const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config;
const credentials = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
};

async function clientConnect() {
  const client = new Client(credentials);
  await client.connect();
  const now = await client.query('SELECT * FROM test_1 WHERE myid = $1', [1]);
  await client.end();

  return now;
}

// Use a self-calling function so we can use async / await.

(async () => {
  const clientResult = await clientConnect();
  console.log(clientResult.rows);
})();

app.use(userRouter);

wxservice.getData().then(() => {
  app.listen(3000);
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
