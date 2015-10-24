var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next){
  res.json(req.isAuthenticated());
});

router.get('/avail', function(req, res, next){
  if(!req.user) { return res.send(401, 'Unauthorized'); }

  res.sendFile(path.join(__dirname, '../views/studAvail.html'));
});

router.get('/change', function(req, res, next){
  if(!req.user) { return res.send(401, 'Unauthorized'); }

  res.sendFile(path.join(__dirname, '../views/studChange.html'));
});

router.get('/home', function(req, res, next) {
  if (!req.user) { return res.send(401, 'Unauthorized'); }

  res.sendFile(path.join(__dirname, '../views/studHome.html'));
});

router.get('/subLanding', function(req, res, next){
  if(!req.user) { return res.send(401, 'Unauthorized'); }

  res.sendFile(path.join(__dirname, '../views/studSubLanding.html'));
});

router.get('/fail', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/loginFail.html'))
});

module.exports = router;