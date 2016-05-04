var express = require('express');
var router = express.Router();

var async = require('async');

// Geocoder finds longitude and latitude from zipcode
var geocoder = require('geocoder');

// bring in Stormpath creds
var stormpath = require('stormpath');
var apiKey = new stormpath.ApiKey(
  process.env['STORMPATH_CLIENT_APIKEY_ID'],
  process.env['STORMPATH_CLIENT_APIKEY_SECRET']
);

//connect to Stormpath client
var sclient = new stormpath.Client({ apiKey: apiKey });

//connect to Redis DB, check for errors
var redis = require("redis");
var client = redis.createClient("redis://localhost:6379", {
  detect_buffers: true,
  no_ready_check: true
});

client.on("error", function(err) {
  console.log("Error: ", err);
});


//matches for guests
exports.guestSearch = function(req, res, next) {
  geocoder.geocode(`${req.params.zipCode}`, function(err, data) {
    if(err || !data.results.length) {
      return res.status(400).send(err || []);
    } else {
      var locObj = data.results[0].geometry.location; //locObj =  {lat: x, lng: y}
      client.georadius("UserLocs", locObj.lng, locObj.lat, 10, "mi",
                        "withdist", "ASC", function(err2, users) {
        if (err2 || !users.length) {
          return res.status(400).send(err2 || []);
        } else {
          var result = [];
          async.forEach(users, function(user, callback) {
            client.hset(user[0], "dist", user[1]);
            client.hgetall(user[0], function(err3, reply) {
              result.push(reply);
              callback(err3);
            });
          }, function(err3) {
            if (err3) {
              return res.status(400).send(err3);
            }
            //georadius returns the original user as well, shift out of array
            result.shift();
            return res.send(result);
          })
        }
      })
    }
  })
};

//get matches for member, must pass in id in params
exports.memberSearch =  function(req, res, next) {
  client.georadiusbymember("UserLocs", `user:${req.params.id}`,
        `${req.params.radius}`, "mi", "withdist", "ASC", function(err, users) {
    if (err || !users.length) {
      return res.status(400).send(err || []);
    } else {
      var result = [];
      async.forEach(users, function(user, callback) {
        client.hset(user[0], "dist", user[1]);
        client.hgetall(user[0], function(err2, reply) {
          result.push(reply);
          callback(err2);
        });
      }, function(err2) {
        if (err2) {
          return res.status(400).send(err2);
        }
        // returns original user as well, shift out of array
        result.shift();
        return res.send(result);
      })
    }
  })
};

//get specific user.  must pass id
exports.runnerProfile = function(req, res, next) {
  client.hgetall(`user:${req.params.id}`, function(err, userInfo) {
    if (err) {
      return res.status(400).send(err);
      return;
    }
    return res.send(userInfo);
  })
};


//Create a new user
exports.createUser =  function(req, res, next) {
  geocoder.geocode(`${req.body.zipCode}`, function(err, data) {
    if(err || !data.results.length) {
      return res.status(400).send(err || []);
    } else {
    var locObj = data.results[0].geometry.location; //locObj =  {lat: x, lng: y}
    client.hmset(`user:${req.body._id}`,
      "_id", `${req.body._id}`,
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
      "latitude", `${locObj.lat}`,
      function(err2) {
        if(err2) {
          return res.status(400).send(err2)
        } else {
          //add the user to the UserLocs geodata
          client.geoadd("UserLocs", locObj.lng, locObj.lat,
            `user:${req.body._id}`, function(err3, reply) {
              if(err3) {
                return res.status(400).send(err3);
              } else {
                return res.send('User Created!');
              }
          })
        }
      })
    }
  })
};


//Update user, almost identical to create user
//except the userId is in the params
exports.updateUser = function(req, res, next){
  geocoder.geocode(`${req.body.zipCode}`, function(err, data) {
    if(err || !data.results.length) {
      return res.status(400).send(err || []);
    } else {
    var locObj = data.results[0].geometry.location; //locObj =  {lat: x, lng: y}
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
      "longitude", `${locObj.lng}`,
      "latitude", `${locObj.lat}`,
      function(err2) {
        if(err2) {
          return res.status(400).send(err2)
        } else {
          //add the user to the UserLocs geodata
          client.geoadd("UserLocs", locObj.lng, locObj.lat,
            `user:${req.body._id}`, function(err3, reply) {
              if(err3) {
                return res.status(400).send(err3);
              } else {
                return res.send('User Updated!');
              }
          })
        }
      })
    }
  })
};

//delete a user from Stormpath AND Redis
exports.deleteUser = function(req, res) {
  client.zrem("UserLocs", `user:${req.params.id}`);
  client.del(`user:${req.params.id}`);
  var accountHref = `https://api.stormpath.com/v1/accounts/${req.params.id}`;
  sclient.getAccount(accountHref, function(err, account) {
    if(err) return res.status(400).send(err);
    account.delete(function(err) {
      if(err) return res.status(400).send(err);
      return res.send('User Deleted!');
    })
  })
};
