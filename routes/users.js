var express = require('express');
var router = express.Router();

var stringHash = require('string-hash');
var async = require('async');
var Q = require("q");

var redis = require("redis");
var client = redis.createClient("redis://localhost:6379", {
  detect_buffers: true,
  no_ready_check: true
});
var geocoder = require('geocoder');

client.on("error", function(err) {
  console.log("Error: ", err);
});

/* GET users listing. */

//sample route:
router.get('/', function(req, res, next) {
  client.hgetall("user:halliealexander@brainclip.com", function(err, userInfo) {
    if (err) {
      res.send(err);
      return;
    }
    console.log(userInfo);
    res.send(userInfo);
  });
});

//matches for guests
router.get("/guest/:zipcode", function(req, res, next) {
  var deferred = Q.defer();
  geocoder.geocode(`${req.params.zipcode}`, function(err, data) {
    var locObj = data.results[0].geometry.location; //locObj =  {lat: x, lng: y}
    client.georadius("UserLocs", locObj.lng, locObj.lat, 10, "mi", "withdist", "ASC", function(err, users) {
      var result = [];
      if (err) {
        deferred.reject(err);
      } else {
        if (users.length === 0) {
          deferred.resolve([]);
        } else {
          async.forEach(users, function(user, callback) {
            client.hset(user[0], "dist", user[1]);
            client.hgetall(user[0], function(err, reply) {
              result.push(reply);
              callback();
            });
          }, function(err) {
            if (err) {
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
  })
})

//get matches, must pass in id in params
router.get('/matches/:id/:radius', function(req, res, next) {
  var deferred = Q.defer();
  client.georadiusbymember("UserLocs", `user:${req.params.id}`, `${req.params.radius}`, "mi", "withdist", "ASC", function(err, users) {
    var result = [];
    if (err) {
      res.send(err);
      //deferred.reject(err);
    } else {
      if (users.length === 0) {
        deferred.resolve([]);
      } else {
        async.forEach(users, function(user, callback) {
          client.hset(user[0], "dist", user[1]);
          client.hgetall(user[0], function(err, reply) {
            result.push(reply);
            callback();
          });
        }, function(err) {
          if (err) {
            //deferred.reject(err);
            res.send(err);
            return;
          }
          result.shift();
          deferred.resolve(result);
          res.send(result);
        });
      }
    }
  })
  return deferred.promise;
});

//get specific user.  must pass id
router.get('/:id', function(req, res, next) {
  client.hgetall(`user:${req.params.id}`, function(err, userInfo) {
    if (err) {
      res.send(err);
      return;
    }
    res.send(userInfo);
  })
});


//can be used to create or edit user
router.post('/new', function(req, res, next) {
  geocoder.geocode(`${req.params.zipcode}`, function(err, data) {
    if (err) return res.send(err)
    var locObj = data.results[0].geometry.location; //locObj =  {lat: x, lng: y}
    client.hmset(`user:${req.body._id}`,
      "firstName", `${req.body.firstName}`,
      "lastName", `${req.body.lastName}`,
      "email", `${req.body.email}`,
      "photo", `${req.body.photo}`,
      "age", `${req.body.age}`,
      "gender", `${req.body.gender}`,
      "phone", `${req.body.phone}`,
      "zipCode", `${req.body.zipCode}`,
      "about", `${req.body.about}`,
      "registered", Date.now(),
      "milePace", `${req.body.milePace}`,
      "wklyMileage", `${req.body.wklyMileage}`,
      "runEvent", `${req.body.runEvent}`,
      "sixtyM", `${req.body.sixtyM}`,
      "oneHundM", `${req.body.oneHundM}`,
      "twoHundM", `${req.body.twoHundM}`,
      "fourHundM", `${req.body.fourHundM}`,
      "onemiPR", `${req.body.onemiPR}`,
      "fivekPR", `${req.body.fivekPR}`,
      "tenkPR", `${req.body.tenkPR}`,
      "halfPR", `${req.body.halfPR}`,
      "marathonPR", `${req.body.marathonPR}`,
      "longestDistRun", `${req.body.longestDistRun}`,
      "longitude", `${locObj.lng}`,
      "latitude", `${locObj.lat}`);
      //add the user to the UserLocs geodata
      client.geoadd("UserLocs", locObj.lng, locObj.lat, `user:${req.body._id}`);
      res.send('User Created!');
    })
  });


//edit user
router.put('/:id',function(req, res, next){

  client.hmset(`user:${req.params.id}`,
    "firstName", `${req.body.firstName}`,
    "lastName", `${req.body.lastName}`,
    "email", `${req.body.email}`,
    "photo", `${req.body.photo}`,
    "age", `${req.body.age}`,
    "gender", `${req.body.gender}`,
    "phone", `${req.body.phone}`,
    "zipCode", `${req.body.zipCode}`,
    "about", `${req.body.about}`,
    "registered", `${req.body.registered}`,
    "wklyMileage", `${req.body.wklyMileage}`,
    "runEvent", `${req.body.runEvent}`,
    "sixtyM", `${req.body.sixtyM}`,
    "oneHundM", `${req.body.oneHundM}`,
    "twoHundM", `${req.body.twoHundM}`,
    "fourHundM", `${req.body.fourHundM}`,
    "onemiPR", `${req.body.onemiPR}`,
    "fivekPR", `${req.body.fivekPR}`,
    "tenkPR", `${req.body.tenkPR}`,
    "halfPR", `${req.body.halfPR}`,
    "marathonPR", `${req.body.marathonPR}`,
    "milePace", `${req.body.milePace}`,
    "longestDistRun", `${req.body.longestDistRun}`,
    "longitude", `${req.body.longitude}`,
    "latitude", `${req.body.latitude}`);
  //update the user to the UserLocs geodata
  client.geoadd("UserLocs", req.body.longitude, req.body.latitude, `user:${req.params.id}`)
	res.send('User Updated!');
});

router.delete('/delete/:id', function(req, res) {
  console.log('id', req.params.id);
  res.send(req.body)
})



    module.exports = router;
