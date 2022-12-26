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



//# Add sso
router.post('/add', function(req, res, next) {
    var sso_id;
    var query = "[sp_create_sso] '"  
    + req.body.name + "', '"
    + req.body.created_by + "', '"
    + req.body.updated_by +"'";
    dbService.executeQuery(query, function (data, error) {
        if (error) {
          var response = { error: error, message: 'Something went wrong'}; 
          console.log(error);
          res.status(500).json(response);
        } else {
            sso_id = data.recordset[0].sso_id;
            for (let i = 0; i < sso_fields.length; ++i) {
                console.log(sso_fields[0].label);
                var options = sso_fields[0].options;
                var options = options.map(obj => obj.option_value);
                var options = JSON.stringify(options);
                var query = "[sp_create_sso_form_field] '"  
                    + sso_id + "', '"
                    + sso_fields[0].label + "', '"
                    + sso_fields[0].type + "', '"
                    + sso_fields[0].input_name + "', '"
                    + sso_fields[0].isRequired + "', '"
                    + sso_fields[0].validation_regex + "', '"
                    + options + "', '"
                    + req.body.created_by + "', '"
                    + req.body.updated_by +"'";
                    console.log(query);
                dbService.executeQuery(query, function (data, error) {
                    if (error) {
                    var response = { error: error, message: 'Something went wrong'}; 
                    console.log(error);
                    // res.status(500).json(response);
                    } else {
                        // res.status(200).json(data);   
                    }
                });
            }   
        }
      });
      var sso_fields =  req.body.sso_fields;
    //   $.each(sso_fields, function(index, key){
    //     console.log(index);
    //     console.log(key);
    //   })
    // sso_fields.forEach(function (value, index) {
    //     console.log(index);
    //     console.log(key);
    //     // Do something
    //     // Use the arguments supplied. I don't think they need any explanation...
    // });
    
    
    //   for (var name in sso_fields) {
    //     console.log(name);
    //  }
    res.status(200).json('sso_fields'); 
});
//# Add sso
router.get('/getList', function(req, res, next) {
    var query = "[sp_get_sso]";
    dbService.executeQuery(query, function (data, error) {
        if (error) {
        //   var response = { error: error, message: 'Something went wrong'}; 
        //   console.log(response);
        //   res.status(500).json(response);
        } else {
            var response = data.recordsets[0];
            for (let i = 0; i < response.length; ++i) {
                var created_by = response[i].created_by;
                response[i].createdAt = response[i].created_at
                response[i].createdBy = response[i].created_by
                response[i].updatedAt = response[i].updated_at
                response[i].updatedBy = response[i].updated_by
            }

            res.send(data.recordsets[0]);
        }
      });
      
});
router.post('/changeStatus', function(req, res, next) {
    let body = req.body;
    let value = body.value;
    let sso_id = body.sso_id;
    let updated_by = body.updated_by;
    let column_name = body.column_name;
    if(value == true){
        value = 1;
    } else {
        value = 0;
    }
    var query = 'UPDATE pfms_sso SET '+column_name+' = '+value+', updated_by = '+updated_by+' WHERE sso_id = '+sso_id+';';
    console.log(query);
    dbService.executeQuery(query, function (data, error) {
        if (error) {
        //   var response = { error: error, message: 'Something went wrong'}; 
          console.log(error);
        //   res.status(500).json(response);
        } else {

            res.send(data.recordsets[0]);
        }
      });
    // res.status(200).json('sso_fields'); 
});


module.exports = router;