var express = require('express');
var router = express.Router();
var dbService = require('../data/dbService');
var jwt = require('jsonwebtoken');
var hpService = require('../data/helperService');

//# Middleware to validate each user request after user authenticated successfully

router.use(function (req, res, next) {
  
    //# Fetch token from req header or from cookie.
    var token = req.headers['x-access-token'] || req.cookies.jwtoken;

    //# If token exists then verify that token is accurate
    if (token) {
        jwt.verify(token, global.config.secretKey,
        {
            algorithm: global.config.algorithm

        }, function (err, decoded) {
            if (err) {
                let errordata = {
                    message: err.message,
                    expiredAt: err.expiredAt
                };
                
                return res.render('login', { title: 'Unauthorized Access', status: 'Token Expired at ' + err.expiredAt });
            }

            //# Set the decoded structure of the user in req param to use in all authorized requests. 
            req.decoded = decoded;

            //# Call the stored procedure to check if user decoded data is valid and able to authenticate
            var query = "[sp_authenticate] '" + req.decoded.ez_username + "', '" + req.decoded.ez_pwd + "', '" + req.decoded.ez_company_id +"' , '" + req.decoded.ez_country_id +"'";

            //# Get Authorization From Database
            dbService.executeQuery(query, function (data, err) {
                if (err) {
                    console.log(err.name + ':' + err.message);
                } else {

                    //# That stored procedure return 0 if user is invalid or 1 in case of success
                    var result = data.recordset[0].Result;
                    
                    if (result == 1) {
                        next();
                    }
                    else {
                        console.log('Unauthorized Access!!');
                        return res.redirect('/');
                        
                    }
                }
            });
        });
    } else {
        return res.redirect('/');
    }
});

module.exports = router;