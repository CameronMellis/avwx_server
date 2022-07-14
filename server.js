const express = require('express');
const app = express();
const wxservice = require('./wxservice');
const cron = require('node-cron');
const userRouter = require('./routes/stations');
const { Pool, Client } = require('pg');
const credentials = {
  user: 'admin',
  host: 'localhost',
  database: 'avwxdb',
  password: 'getcoding',
  port: 5432,
};

// Connect with a connection pool.

// async function poolDemo() {
//   const pool = new Pool(credentials);
//   await pool.connect();
//   const now = await pool.query('SELECT * FROM test_1');
//   await pool.end();

//   return now;
// }

// Connect with a client.

async function clientConnect() {
  const client = new Client(credentials);
  await client.connect();
  const now = await client.query('SELECT * FROM test_1 WHERE myid = $1',[3]);
  await client.end();

  return now;
}

// Use a self-calling function so we can use async / await.

(async () => {
  // const poolResult = await poolDemo();
  // console.log(poolResult.rows);

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
