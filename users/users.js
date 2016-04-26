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
  client.hmset(`user:${req.email}`, "firstName", `${req.firstName}`, "lastName", `${req.lastName}`,
    "email", `${req.email}`, "photo", `${req.picture}`, "age", `${req.age}`, "gender", `${req.gender}`,
    "phone", `${req.phone}`, "zipCode", `${req.zipCode}`, "about", `${req.about}`, "registered", `${req.registered}`,
    "wklyMileage", `${req.wklyMileage}`, "runEvent", `${req.runEvent}`, "sixtyM", `${req.sixtyM}`,
    "twoHundM", `${req.twoHundM}`, "fourHundM", `${req.fourHundM}`, "onemiPR", `${req.onemiPR}`,
    "fivekPR", `${req.fivekPR}`, "tenkPR", `${req.tenkPR}`, "halfPR", `${req.halfPR}`, "marathonPR", `${req.marathonPR}`,
    "milePace", `${req.milePace}`, "longitude", `${req.longitude}`, "latitude", `${req.latitude}`);
  client.geoadd("UserLocs", req.longitude, req.latitude, `user:${req.email}`);
	res.send('User Created and Updated!');
});


module.exports = router;
