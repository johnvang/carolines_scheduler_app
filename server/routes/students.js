/**
 * Created by johnvang on 10/25/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/*', function(req, res, next){
    console.log('in students router');
    if(!req.user) { return res.send(401, 'Unauthorized'); }

    res.sendFile(path.join(__dirname, '../views/studHome.html'));
});

module.exports = router;