var express = require('express');
var router = express.Router();
var https = require('https');
var nexmo = require('easynexmo');
var nexmo = require('easynexmo');
require('dotenv').config();

var uuid = require('uuid');
var _ = require('lodash');
var multer = require('multer');
// var upload = multer({ dest: '../uploads' });
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

  console.log('phone verification');
  var code = req.body.pin
  var request_id = req.body.request_id;
  // res.send(req.body);
  // console.log(req.body);
  console.log(code);
  console.log(request_id);
  nexmo.checkVerifyRequest({
    request_id: request_id,
    code: code
  }, function(req, response) {
    console.log('nexmo res', response);
    res.send(response)
  });
>>>>>>> master
})

router.post('/upload', upload.single('file'), function(req, res, next){
  console.log('req.file: ', req.file);
  var bucketName = process.env.AWS_BUCKET_NAME;
  var file = req.file;
  var filename = file.originalname;
  var ext = _.last(filename.split('.'))
  var keyName = uuid.v4() + '.' + ext;
  var url = process.env.AWS_URL + bucketName + '/' + keyName;
  var params = { Bucket: bucketName, Key: keyName, Body: file.buffer, ACL: 'public-read' };
    s3.putObject(params, function(err, data) {
      if (err) return res.status(400).send(err);
      else{
          console.log("The URL is", url);
          res.send(url);
      }
    });
});



module.exports = router;
