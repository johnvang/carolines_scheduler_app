var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

router.get('/', function(req, res, next){
    res.sendFile(path.join(__dirname, '../views/adminReg.html'));
});

router.post('/', function(req, res, next){
    Users.create(req.body, function(err, post){
        if(err){
            next(err);
        } else {
            console.log('Registration of new worker successful');
            res.redirect('/');
        }
    });
});

module.exports = router;