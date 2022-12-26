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
router.post('/add', function(req, res, next) {
  var query = "[sp_create_agency] '" 
    + req.body.name + "', '"
    + req.body.street_address + "', '" 
    + req.body.zip_code + "', '" 
    + req.body.city + "', '" 
    + req.body.country_id + "', '" 
    + req.body.country_is_default_nationality + "', '" 
    + req.body.phone_number + "', '" 
    + req.body.url + "', '" 
    + req.body.csv_delimeter + "', '" 
    + req.body.profile_update_Email + "', '" 
    + req.body.email_from + "', '" 
    + req.body.smtp_server + "', '" 
    + req.body.user_name_for_email_server + "', '" 
    + req.body.password_for_email_server + "', '" 
    + req.body.encryption + "', '" 
    + req.body.circle + "', '" 
    + req.body.wholy_own + "', '" 
    + req.body.chain + "', '" 
    + req.body.alias_mercant_id + "', '" 
    + req.body.server_to_server_password + "', '" 
    + req.body.noShow_salt + "', '"
    + req.body.proxy_mercant_id + "', '"
    + req.body.security_sign + "', '"
    + req.body.active + "', '"
    + req.body.key + "', '"
    + req.body.is_faces + "', '"
    + req.body.pci_dss + "', '"
    + req.body.rail + "', '" 
    + req.body.browser_extension + "', '" 
    + req.body.profile_reminders + "', '" 
    + req.body.loyalty_points + "', '" 
    + req.body.resindence_information + "', '" 
    + req.body.self_registration + "', '" 
    + req.body.magnatech + "', '" 
    + req.body.concur_polling + "', '" 
    + req.body.created_by + "', '"
    + req.body.updated_by +"'";
  dbService.executeQuery(query, function (data, error) {
    if (error) {
      var response = { error: error, message: 'Something went wrong'}; 
      res.status(500).json(response);
    } else {
      var response = { message: 'Agency has been successfully created'}; 
      res.status(200).json(response);    
    }
  });    
});


module.exports = router;