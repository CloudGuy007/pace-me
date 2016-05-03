var express = require('express');
var https = require('https');
var router = express.Router();
var nexmo = require('easynexmo');
require('dotenv').config();

nexmo.initialize(process.env.NEXMO_API_KEY, process.env.NEXMO_API_SECRET);

router.post('/new', function(req, res) {
  console.log("req.body", req.body);
  var profile = ` & check out my PaceMe profile here: http://localhost:3000/#/profile/${req.body.link}`;
  var message = req.body.message + profile;
  var sender = '16572087372';
  var to = '1'+req.body.phone;

  nexmo.sendTextMessage(sender, to, message, function(err, responseData) {
    if (err){
      return res.send("text message error", err);
    }
    console.log("responseData", responseData);
    res.send(req.body);
  })
})

module.exports = router;
