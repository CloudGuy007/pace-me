var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/current', function(req, res, next){
	res.send('get to /current');
});



router.get('/matches', function(req, res, next){
	res.send('get to /matches');
});

router.get('/:id', function(req, res, next){
	res.send('get to /' + req.params.id);
});

router.put('/matches', function(req, res, next){
	res.send('put to /matches');
});

router.put('/:id',function(req, res, next){
	res.send('put to /:id');
});









module.exports = router;
