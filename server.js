const express = require('express');
const app = express();
const request = require('request');

app.set('views', './views');
app.set('view engine', 'ejs');

let requestAsync = function (url) {
  return new Promise((resolve, reject) => {
    let req = request(url, headers, (err, response, body) => {
      if (err) return reject(err, response, body);
      resolve(JSON.parse(body));
    });
  });
};

const urls = [
  'https://avwx.rest/api/metar/CYYT',
  'https://avwx.rest/api/taf/CYYT',
  'https://avwx.rest/api/metar/CYQX',
  'https://avwx.rest/api/taf/CYQX',
  'https://avwx.rest/api/metar/CYDF',
  'https://avwx.rest/api/taf/CYDF',
  'https://avwx.rest/api/metar/CYJT',
  'https://avwx.rest/api/taf/CYJT',
  'https://avwx.rest/api/metar/CYAY',
  'https://avwx.rest/api/taf/CYAY',
  'https://avwx.rest/api/metar/CYBX',
  'https://avwx.rest/api/taf/CYBX',
  'https://avwx.rest/api/metar/CYYR',
  'https://avwx.rest/api/taf/CYYR',
  'https://avwx.rest/api/metar/CZUM',
  'https://avwx.rest/api/taf/CZUM',
  'https://avwx.rest/api/metar/CYWK',
  'https://avwx.rest/api/taf/CYWK',
  'https://avwx.rest/api/metar/CYDP',
  'https://avwx.rest/api/taf/CYDP',
  'https://avwx.rest/api/metar/CYNA',
  'https://avwx.rest/api/taf/CYNA',
  'https://avwx.rest/api/metar/CYKL',
  'https://avwx.rest/api/taf/CYKL',
];

const headers = {
  headers: {
    Authorization: 'dB2w9VHe5mzuqKLgd9Slf5RyIg5jUv3mNV5DyWJpY4s',
  },
};

let getData = async function () {
  //transform requests into Promises, await all
  try {
    var data = await Promise.all(urls.map(requestAsync));
  } catch (err) {
    console.error(err);
  }
  console.log(data);
};

getData();

const userRouter = require('./routes/users');

app.use('/station', userRouter);

app.listen(3000);
