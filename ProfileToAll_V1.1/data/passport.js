var passport = require('passport');
var strategy = require('passport-local');
var passportCustom = require('passport-custom');

var dbService = require('../data/dbService');
var encService = require('../data/encryption');
let jwt = require('jsonwebtoken');
const CustomStrategy = passportCustom.Strategy;

//# Custom Authentication: Passport is node js package and used for different type of authentication purpose.

passport.use(new CustomStrategy(
    function(req, callback) {
        
        //# Stored Procedure: To fetch country id using country Abbreviation
        var cquery = "[sp_get_country_on_code] '" + req.body.country + "'";
        dbService.executeQuery(cquery, function (data, err) {
            if (err) {
                callback(null, err);
            } 
            else {
                countryID = data.recordset[0].ez_country_id;

                //# Set the value in req to use further to encrypt the username
                req.d = req.body.username;

                //# Encrypt username
                encService.enc(req, function(data1, err1){
                    
                    if(err1){
                        callback('null',err1);
                    }
                    else{
                        req.encUsername = data1;
                    }
                });

                //# Set the value in req to use further to encrypt the password
                req.d = req.body.password;

                //# Encrypt password
                encService.enc(req, function(data2, err2){
                    
                    if(err2){
                        callback('null',err2);
                    }
                    else{
                        req.encPassword = data2;
                    }
                });

                //# This piece of code will execute once above both processes completes their functionality
                setTimeout(function(){
                    if(req.encPassword !== undefined && req.encUsername !== undefined){

                        //# Stored Procedure: Execute the SP using encrypted username, password and country/company Ids to fetch the valid user information. 
                        var query = "[sp_authenticate_dev] '" + req.encUsername + "', '" + req.encPassword + "', '" + req.body.company +"' , '" + countryID +"'";
                        dbService.executeQuery(query, function (data3, err3) {
                            if (err3) {
                                callback(null, err3);
                            } 
                            else {
                                
                                //# IF stored procedure executes properly and user is invalid.
                                if (data3.recordset[0].Result !== undefined){
                                    callback({ user: null, token: null });
                                }
                                //# IF stored procedure executes properly and user is valid.
                                else{
                                    var result = data3.recordset
                                    result[0].ez_company_name = req.params.name;
    
                                    if (result.length> 0) {

                                        //# Set JWT token to use further for all authorized routes or verify user access
                                        let token = jwt.sign({ user :result[0] }, global.config.secretKey, {
                                            algorithm: global.config.algorithm,
                                            expiresIn: 200 // 86400 expires in 24 hours
                                        });
                                        callback({ user: result[0], token: token });
                                        
                                    }
                                    else {
                                        callback({ user: null, token: null });
                                    }
                                }
                            }
                        });
                    }
                    
                }, 1000);
                
                console.log(data.recordset[0].ez_country_id);
            }
        });
    }));

module.exports = passport;