var express = require('express');
var router = express.Router();

var controller = require('./users.route.controller');

//matches for guests
router.get('/guest/:zipCode', controller.guestSearch);

//matches for registered user
router.get('/matches/:id/:radius', controller.memberSearch);

//get one users profile
router.get('/:id', controller.runnerProfile);

//can be used to create
router.post('/new', controller.createOrUpdateUser);

//edit user
router.put('/:id', controller.createOrUpdateUser);

// delete user from Redis and Stormpath
router.delete('/delete/:id', controller.deleteUser);

module.exports = router;
