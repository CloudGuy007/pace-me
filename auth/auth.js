var express = require('express');
var router = express.Router();
var https = require('https');
var nexmo = require('easynexmo');
var nexmo = require('easynexmo');
require('dotenv').config();

nexmo.initialize(process.env.NEXMO_API_KEY, process.env.NEXMO_API_SECRET);


router.post('/phone', function(req, res) {
  var phone = req.body.phoneNumber;
  console.log(phone);
  // console.log(phone);
  // res.send();
  nexmo.verifyNumber({
    number: phone,
     brand: 'Pace Me'
   }, function(req, response) {
    console.log(response);
    res.send(response)
  });

})

router.post('/phone/verify', function(req, res) {
  var code = req.body.pin
  var request_id = req.body.request_id;
  // res.send();
  nexmo.checkVerifyRequest({
    request_id: request_id,
    code:code
  }, function(req, response){
    console.log(response);
    res.send(response)
    });

})





module.exports = router;
