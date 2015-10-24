var express = require('express');
var passport = require('passport');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.post('/', passport.authenticate('local', {failureRedirect: '/users/fail'}), function(req, res) {
  if (req.user.isAdmin) {
    res.redirect('/admin');
  } else {
    res.redirect('/users/home');
  }
  //successRedirect:'/users/home',
  //failureRedirect: '/users/fail'
});

module.exports = router;
