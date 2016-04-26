var express = require('express');
var router = express.Router();
var https = require('https');
var nexmo = require('easynexmo');
var nexmo = require('easynexmo');
require('dotenv').config();

var uuid = require('uuid');
var _ = require('lodash');
var multer = require('multer');
var upload = multer({ storage: multer.memoryStorage() });
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

nexmo.initialize(process.env.NEXMO_API_KEY, process.env.NEXMO_API_SECRET);


router.post('/phone', function(req, res) {
  var phone = req.body.phoneNumber;
  console.log('req.body', req.body);
  nexmo.verifyNumber({
    number: phone,
    brand: 'Pace Me'
  }, function(req, response) {
    console.log('response', response);
    res.send(response)
  });
})

router.post('/phone/verify', function(req, res) {
  console.log('req.body', req.body);
  res.send('hi')
  // var code = req.body.pin
  // var request_id = req.body.request_id;
  // nexmo.checkVerifyRequest({
  //   request_id: request_id,
  //   code: code
  // }, function(req, response) {
  //   console.log(response);
  //   res.send(response)
  // });
})

router.post('/upload', upload.single('photo'), function(req, res, next){
  var bucketName = 'testpaceme';
  var file = req.file;
  var filename = file.originalname;
  var ext = _.last(filename.split('.'))
  var keyName = uuid.v4() + '.' + ext;
  var url = process.env.AWS_URL + bucketName + '/' + keyName;
  var params = { Bucket: bucketName, Key: keyName, Body: file.buffer, ACL: 'public-read' };
    s3.putObject(params, function(err, data) {
      if (err){
        console.log(err)
      }
      else{
        console.log("Successfully uploaded data to myBucket/myKey");
          console.log("The URL is", url);
      }
    });
  res.sendStatus(200);
});



module.exports = router;
