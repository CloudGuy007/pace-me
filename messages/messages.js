var express = require('express');
var https = require('https');
var router = express.Router();
var nexmo = require('easynexmo');
require('dotenv').config();

const NEXMO_API_KEY = process.env.NEXMO_API_KEY;
const NEXMO_API_SECRET = process.env.NEXMO_API_SECRET;


nexmo.initialize(NEXMO_API_KEY, NEXMO_API_SECRET);

router.post('/new', function(req, res) {

  // console.log(req.body);
  var message = 'test message';
  var sender = '12182615141';
  var to = '19896009285';

  nexmo.sendTextMessage(sender, to, message, function(req, responseData) {
    console.log(responseData);
    res.send();
  })


})

module.exports = router;
