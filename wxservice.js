const request = require('request');

let requestAsync = function (url) {
  return new Promise((resolve, reject) => {
    let req = request(url, headers, (err, response, body) => {
      if (err) return reject(err, response, body);
      resolve(JSON.parse(body));
    });
  });
};

const urls = [
  'https://avwx.rest/api/metar/multi/CYYT,CYDF',
  'https://avwx.rest/api/taf/CYYT',
];

const headers = {
  headers: {
    Authorization: 'dB2w9VHe5mzuqKLgd9Slf5RyIg5jUv3mNV5DyWJpY4s',
  },
};

var data = { data: '' };

let getData = async function () {
  //transform requests into Promises, await all
  try {
    data.data = await Promise.all(urls.map(requestAsync));
  } catch (err) {
    console.error(err);
  }
  console.log(data);
};

module.exports = { wxdata: data, getData: getData };
