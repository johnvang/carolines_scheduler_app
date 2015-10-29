/**
 * Created by johnvang on 10/25/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var Change = require('../models/change');

router.get('/', function(req, res, next){
    if(!req.user || !req.user.isAdmin) { return res.send(401, 'Unauthorized'); }

    Change.find({}, function(err, changes) {
        res.json(changes);
    });
});

router.post('/', function(req, res, next){
    if(!req.user) { return res.send(401, 'Unauthorized'); }
    var attributes = req.body;
    attributes._creator = req.user._id;
    attributes.username = req.user.username;
    Change.create(attributes, function(err, change){
        if(err){
            console.log(err);
            res.send(422, 'unable to create change request');
        } else {
            res.json(change);
        }
    });
});

router.delete('/:id', function(req, res, next){
    console.log('in change delete router');
    if(!req.user || !req.user.isAdmin) { return res.send(401, 'Unauthorized'); }

    Change.findOneAndRemove({_id: req.params.id}, function(err, change){
        if(err){
            console.log(err);
            res.send(404, 'user not found');
        } else {
            res.json(change);
        }
    });
});

module.exports = router;