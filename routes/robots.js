var express = require('express');
var redis = require('redis');
var redisClient = redis.createClient();
var router = express.Router();

/* GET movie listings. */
router.get('/', function(req, res, next) {
  redisClient.smembers("robots", function (err, robots) {
    res.locals.robots = robots ? robots : [];
    res.render('robots');
  });
});

/* POST add movie. */
router.post('/', function(req, res, next) {
  redisClient.sadd("robots", req.body.name);
  res.redirect('/robots');
});

/* DELETE a movie */
router.get('/delete/:name', function(req, res, next) {
  redisClient.srem("robots", req.params.name);
  res.redirect('/robots');
});

module.exports = router;
