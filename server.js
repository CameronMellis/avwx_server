const express = require('express');
const app = express();
const wxservice = require('./wxservice');
const cron = require('node-cron');
const userRouter = require('./routes/server_routes');
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

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }))

app.use(userRouter);

//Disabled for testing purposes, otherwise rate limited by API

// wxservice.getData().then(() => {
//   app.listen(3000);
// });

app.listen(3000);

app.get('/', (req, res) => {
  res.render('index.ejs', { name: 'Cam' });
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post('/login', (req, res) => {

});

app.get('/register', (req, res) => {
  res.render('register.ejs');
});

app.post('/register', (req, res) => {

});


// cron currently updating wxdata every hour, extra requests saved for manual updating

//Disabled for testing purposes

// cron.schedule(
//   '0 * * * *',
//   () => {
//     wxservice.getData();
//     console.log('getting new weather every hour');
//   },
//   {
//     scheduled: true,
//     timezone: 'UTC',
//   }
// );
