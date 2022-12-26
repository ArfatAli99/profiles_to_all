//# This is a helper service. For some generic functions. 

var dbService = require('../data/dbService');

//# This function will check if company name given in the route, is accurate or not.
var checkCompanyPath = function (req, res, callback) {
    
    //# Stored Procedure to get company detail on the basis of ez_sitepath column from ez_company table.
    let query = "[sp_get_company_details_on_path]" + req.params.name + "";

    //# Database Query
    dbService.executeQuery(query, function (data, err) {
        if (err) {
            console.log(err);
            callback(null, err);
        } else {
            
            callback(data.recordset);
        }
    });
};

//# This function will return list of countries that are configured for a specific company 
var countryOfcompany = function(req, res, callback){
    console.log(req.params.comID);
    
    //# Stored Procedure to get countries from ez_company_location table using company id 
    let query = "[sp_get_company_location_sorted]" + req.params.comID + "," + req.params.sort + ", " + req.params.rusontop + "," + req.params.rcountontop + "";
    
    //# Database Query
    dbService.executeQuery(query, function (data, err) {
        if (err) {
            console.log(err);
            callback(null, err);
        } else {
            
            callback(data.recordset);
        }
    });    
};


module.exports = {
    checkCompanyPath,
    countryOfcompany
   };