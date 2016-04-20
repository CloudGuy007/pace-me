var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:userId', function(req, res, next) {
  res.send();
});

router.post('/', function(req, res, next) {
  res.send();
});

module.exports = router;
