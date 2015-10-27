var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/user');

//get all users
router.get('/', function(req, res, next){
  if(!req.user || !req.user.isAdmin) { return res.send(401, 'Unauthorized'); }

  User.find({}, function(err, users) {
    res.json(users);
  });
});

router.post('/', function(req, res, next){
  if(!req.user || !req.user.isAdmin) { return res.send(401, 'Unauthorized'); }

  User.create(req.body, function(err, user){
    if(err){
      console.log(err);
      res.send(422, 'unable to create user');
    } else {
      res.json(user);
    }
  });
});

router.delete('/:id', function(req, res, next){
  if(!req.user || !req.user.isAdmin) { return res.send(401, 'Unauthorized'); }

  User.findOneAndRemove({_id: req.params.id}, function(err, user){
    if(err){
      console.log(err);
      res.send(404, 'user not found');
    } else {
      res.json(user);
    }
  });
});

router.put('/hoursAvail', function(req, res, next){
  if(!req.user) { return res.send(401, 'Unauthorized'); }
  var id = req.user._id;
  console.log(id);
  console.log(req.user);
  console.log('in update router');
  console.log(req.body);
  User.findByIdAndUpdate(id, {hoursAvail: req.body.hoursAvail}, function(err, user){
    if(err){
      console.log(err);
      res.send(404, 'user not found');
    } else {
      res.json(user);
    }
  })
});

//router.get('/subLanding', function(req, res, next){
//  if(!req.user) { return res.send(401, 'Unauthorized'); }
//
//  res.sendFile(path.join(__dirname, '../views/studSubLanding.html'));
//});
//
//router.get('/fail', function(req, res, next) {
//  res.sendFile(path.join(__dirname, '../views/loginFail.html'))
//});

module.exports = router;