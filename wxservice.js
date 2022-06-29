const request = require('request');

let requestAsync = function (url) {
  return new Promise((resolve, reject) => {
    let req = request(url, headers, (err, response, body) => {
      if (err) return reject(err, response, body);
      resolve(JSON.parse(body));
    });
  });
};

// cron currently updating wxdata every 30 mins (28 possible)

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
  'https://avwx.rest/api/metar/CYUL',
  'https://avwx.rest/api/taf/CYUL',
  'https://avwx.rest/api/metar/CYQB',
  'https://avwx.rest/api/taf/CYQB',
  'https://avwx.rest/api/metar/CYHU',
  'https://avwx.rest/api/taf/CYHU',
  'https://avwx.rest/api/metar/CYRQ',
  'https://avwx.rest/api/taf/CYRQ',
  'https://avwx.rest/api/metar/CYMX',
  'https://avwx.rest/api/taf/CYMX',
  'https://avwx.rest/api/metar/CYRQ',
  'https://avwx.rest/api/taf/CYRQ',
  'https://avwx.rest/api/metar/CYOW',
  'https://avwx.rest/api/taf/CYOW',
  'https://avwx.rest/api/metar/CYND',
  'https://avwx.rest/api/taf/CYND',
  'https://avwx.rest/api/metar/CYYZ',
  'https://avwx.rest/api/taf/CYYZ',
  'https://avwx.rest/api/metar/CYVO',
  'https://avwx.rest/api/taf/CYVO',
  'https://avwx.rest/api/metar/CYUY',
  'https://avwx.rest/api/taf/CYUY',
  'https://avwx.rest/api/metar/CYBG',
  'https://avwx.rest/api/taf/CYBG',
  'https://avwx.rest/api/metar/CYBC',
  'https://avwx.rest/api/taf/CYBC',
  'https://avwx.rest/api/metar/CYGR',
  'https://avwx.rest/api/taf/CYGR',
  'https://avwx.rest/api/metar/CYGP',
  'https://avwx.rest/api/taf/CYGP',
  'https://avwx.rest/api/metar/CYGV',
  'https://avwx.rest/api/taf/CYGV',
  'https://avwx.rest/api/metar/CYZV',
  'https://avwx.rest/api/taf/CYZV',
  'https://avwx.rest/api/metar/CYHZ',
  'https://avwx.rest/api/taf/CYHZ',
  'https://avwx.rest/api/metar/CYQM',
  'https://avwx.rest/api/taf/CYQM',
  'https://avwx.rest/api/metar/CYYG',
  'https://avwx.rest/api/taf/CYYG',
  'https://avwx.rest/api/metar/CYFC',
  'https://avwx.rest/api/taf/CYFC',
  'https://avwx.rest/api/metar/CZBF',
  'https://avwx.rest/api/taf/CZBF',
  'https://avwx.rest/api/metar/CYQY',
  'https://avwx.rest/api/taf/CYQY',
  'https://avwx.rest/api/metar/CYSJ',
  'https://avwx.rest/api/taf/CYSJ',
  'https://avwx.rest/api/metar/CYQI',
  'https://avwx.rest/api/taf/CYQI',
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
