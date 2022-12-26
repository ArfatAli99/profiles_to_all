var express = require('express');
var router = express.Router();
var passport = require('../data/passport');
let jwt = require('jsonwebtoken');
var hpService = require('../data/helperService');
let verifyToken = require('./verifytoken');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//# Portal Login Page
router.get('/:name', function(req, res, next) {

    //# check if company sitepath is correct
    hpService.checkCompanyPath(req, res, function(data, err){
        if(err){

            //# if any error occurs while executing the SP then redirect user.
            var response = {page: '500', company: '', countries:'', message: 'Something went wrong'} 
            res.status(500).json(response);

        }
        else{

            //# If data has length and valid result then proceed
            if(data.length > 0){

              //# Start Block

              //# If token is already exists then verify the company id 
              //# and redirect user to home page or else redirect to their respective login page. 

              var token = req.cookies.jwtoken;
            //   if(token){
            //       var decoded = jwt.verify(token, global.config.secretKey);
            //       if(decoded.ez_company_id == data[0].ez_company_id){
            //           return  res.redirect('/portal/'+req.params.name+'/home');
            //       }
            //   }

              //# End block
            
              //# Set the following values in req to use further to fetch the countries from ez_company_location table
              req.params.comID = data[0].ez_company_id;
              req.params.sort = 1;
              req.params.rusontop = 0;
              req.params.rcountontop = data[0].ez_homepage_default_country_abbr;
              
              //# Fetch the countries of a specific company from ez_company_location
              hpService.countryOfcompany(req, res, function(data1, err){
                  if(err){
                    var response = {page: '500', company: '', countries:'', message: 'Somethong went wrong'} 
                    res.status(500).json(response);
                  }
                  else{

                      //# Render the login page by passing the company and country data 
                    //   res.render('login', {company: data[0], country:data1});
                    var response = {page: '200', company: data[0], countries:data1} 
                     res.status(200).json(response);
                    //  res.status(404).send({url: req.originalUrl + ' not found'})
                  }
              });
            }
            else{
                var response = {page: '404', company: '', countries:'', message: 'Not found'} 
                    res.status(200).json(response);
            }
        }
    }) 

});

//# Authenticate the user login request
router.post('/:name', function(req, res, next) {
  
    //# Passport custom functionality to authenticate the user using composite unique keys
    passport.authenticate('custom', { "session": false }, function (data, err) {
      
        if (err) {
            // res.redirect('/portal/'+req.params.name+'?status=' + encodeURIComponent('Error Login!!'));
            return res.status(400).send({ 'msg': err });
            console.log(err.name + ':' + err.message);
        } 
        else {
            if (data.user != null) {
                //# console.log(data);

                //# Set encrypted token values in the cookie to use further for authorization  
                // res.cookie('jwtoken', data.token);

                //# Redirect user to home page after successfull authentication 
                // res.redirect('/portal/'+req.params.name+'/home');
                return res.status(200).json({
                    token: data.token
                });
              
            }
            else {
                //# If user details are not valid then redirect the user to login page
                // res.redirect('/portal/'+req.params.name+'?status=' + encodeURIComponent('Incorrect login details!!'));
                return res.status(400).json({ msg: 'The email and password don\'t match.' });
            }
        }
    })(req, res, next);
  
});

//# Home Page
//# Home Page used {{verifytoken middleware}} to validate the user access
router.get('/:name/home', verifyToken, function(req, res, next) {
  
    console.log(req.decoded);

    //# If user tried to access any other vortal with same token 
    //# then user will be redirected to login page otherwise user will see home page.

    if(req.decoded.ez_company_name == req.params.name){
        res.render('home', {user: req.decoded});
    }
    else{
        res.redirect('/portal/'+req.params.name);
    }
});

module.exports = router;