var express = require('express');
var router = express.Router();

var stringHash = require('string-hash');
var async = require('async');
var Q = require("q");

var redis = require("redis");
var client = redis.createClient("redis://localhost:6379", {detect_buffers: true, no_ready_check: true});

client.on("error", function (err) {
  console.log("Error: ", err);
});

/* GET users listing. */

//sample route:
router.get('/', function(req, res, next) {
  client.hgetall("user:amparoholt@dogspa.com", function(err, userInfo) {
    if(err) {
      res.send(err);
    }
    console.log(userInfo);
    res.send(userInfo);
  });
});

//get current users info, must pass in email as id
router.get('/:id/me', function(req, res, next){
  client.hgetall(`user:${req.params.id}`, function(err, userInfo) {
    if(err) {
      res.send(err);
    }
    console.log(userInfo);
    res.send(userInfo);
  })
});


//get matches, must pass in email as id
router.get('/:id/matches', function(req, res, next){
  var deferred = Q.defer();
  client.georadiusbymember("UserLocs", `user:${req.params.id}`, 20, "mi", "withdist", "ASC", function(err, users) {
    var result = [];
    if(err) {
      deferred.reject(err);
    } else {
      if(users.length === 0) {
        deferred.resolve([]);
      }
      else {
        async.forEach(users, function(user, callback) {
          client.hset(user[0], "dist", user[1]);
          client.hgetall(user[0], function(err, reply) {
            result.push(reply);
            callback();
          });
        }, function(err) {
          if(err) {
            deferred.reject(err);
            return;
          }
          result.shift();
          console.log('RESULT', result);
          deferred.resolve(result);
          res.send(result);
        });
      }
    }
  })
  return deferred.promise;
});

//get specific user.  must pass in email as id
router.get('/:id/runbuddy', function(req, res, next){
  client.hgetall(`user:${req.params.id}`, function(err, userInfo) {
    if(err) {
      res.send(err);
    }
    console.log(userInfo);
    res.send(userInfo);
  })
});

// *********************************************
// What is this????
router.put('/matches', function(req, res, next){
	res.send('put to /matches');
});

//can be used to create or edit user
router.post('/:id/me',function(req, res, next){
  client.hmset(`user:${req.body.email}`, "firstName", `${req.body.firstName}`, "lastName", `${req.body.lastName}`,
    "email", `${req.body.email}`, "photo", `${req.body.photo}`, "age", `${req.body.age}`, "gender", `${req.body.gender}`,
    "phone", `${req.body.phone}`, "zipCode", `${req.body.zipCode}`, "about", `${req.body.about}`, "registered", `${req.body.registered}`,
    "wklyMileage", `${req.body.wklyMileage}`, "runEvent", `${req.body.runEvent}`, "sixtyM", `${req.body.sixtyM}`,
    "oneHundM", `${req.body.oneHundM}`,"twoHundM", `${req.body.twoHundM}`, "fourHundM", `${req.body.fourHundM}`,
    "onemiPR", `${req.body.onemiPR}`, "fivekPR", `${req.body.fivekPR}`, "tenkPR", `${req.body.tenkPR}`, "halfPR", `${req.body.halfPR}`,
    "marathonPR", `${req.body.marathonPR}`, "milePace", `${req.body.milePace}`, "longestDistRun", `${req.body.longestDistRun}`,
    "longitude", `${req.body.longitude}`, "latitude", `${req.body.latitude}`);
  client.geoadd("UserLocs", req.body.longitude, req.body.latitude, `user:${req.body.email}`)
});
	res.send('User Created and Updated!');
});


module.exports = router;
