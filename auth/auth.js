var express = require('express');
var router = express.Router();
var https = require('https');
require('dotenv').config();

const NEXMO_API_KEY = process.env.NEXMO_API_KEY;
const NEXMO_API_SECRET = process.env.NEXMO_API_SECRET;


router.get('/', function(req, res) {
  res.send('ok')
})

router.post('/phone', function(req, res) {
  var phone = req.body.phone;

  var data = JSON.stringify({
    api_key: NEXMO_API_KEY,
    api_secret: NEXMO_API_SECRET,
    number: phone,
    brand: 'Pace Me'
  });

  var options = {
    host: 'api.nexmo.com',
    path: '/verify/json',
    port: 443,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  var req = https.request(options);

  req.write(data);
  req.end();

  var responseData = '';
  req.on('response', function(res) {
    res.on('data', function(chunk) {
      responseData += chunk;
    });

    res.on('end', function() {
      var data = JSON.parse(responseData);
      console.log('responseData', responseData);
      var request_id = responseData.request_id;

    });
  });
})

router.post('/phone/verify', function(req, res) {

  console.log(req.body.pin);
  // res.send();

  var data = JSON.stringify({
    api_key: NEXMO_API_KEY,
    api_secret: NEXMO_API_SECRET,
    request_id: 'b83262a9bf364efea82529c81d2c85d6',
    code: req.body.pin
  });

  var options = {
    host: 'api.nexmo.com',
    path: '/verify/check/json',
    port: 443,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  var req = https.request(options);

  req.write(data);
  req.end();

  var responseData = '';
  req.on('response', function(res) {
    res.on('data', function(chunk) {
      responseData += chunk;
    });

    res.on('end', function() {
      console.log(JSON.parse(responseData));
    });
  });
})





module.exports = router;
