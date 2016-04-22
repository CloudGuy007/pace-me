var express = require('express');
var https = require('https');
var router = express.Router();
var nexmo = require('easynexmo');
require('dotenv').config();

nexmo.initialize(process.env.NEXMO_API_KEY, process.env.NEXMO_API_SECRET);


router.post('/new', function(req, res) {
  var message = req.body.userMsg;
  var sender = '12182615141';
  var to = '19896009285';

  nexmo.sendTextMessage(sender, to, message, function(req, responseData) {
    console.log(responseData);
    res.send();
  })
})

module.exports = router;
