var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/*', function(req, res, next){
    if(!req.user || !req.user.isAdmin) { return res.send(401, 'Unauthorized'); }

    res.sendFile(path.join(__dirname, '../views/adminIndex.html'));
});


module.exports = router;