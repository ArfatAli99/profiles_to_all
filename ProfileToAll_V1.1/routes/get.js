var express = require('express');
var router = express.Router();
var dbService = require('../data/dbService');
// var passport = require('../data/passport');
// let jwt = require('jsonwebtoken');
// var hpService = require('../data/helperService');
// let verifyToken = require('./verifytoken');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



//# Add agency
router.get('/countries', function(req, res, next) {
  var query = "[sp_list_country]";
    dbService.executeQuery(query, function (data, error) {
        if (error) {
            var response = {page: '500', countries:'', message: 'Something went wrong'}; 
            res.status(500).json(response);
        } else {
            var response = {page: '200', countries:data.recordsets[0], message: ''}; 
            res.status(200).json(response);
        }
    });
});


module.exports = router;