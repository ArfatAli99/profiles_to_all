//# Encryption Service according to ATG encrypt/decrypt pattern
const axios = require('axios');

//# This fucntion will return encrypted key. I have used an API of Coldfusion from ATGWEb1 server.
var enc = function (req, callback) {
    console.log(req.d);
    axios.get('http://atgtravel.com/portal/apiUser.cfm?value='+req.d+'&type=enc')
    .then(response => {
        callback(response.data);
    })
    .catch(error => {
        console.log(error);
        callback(null,error);
    });
};

//# This function will return decrypted key. I have used an API of Coldfusion from ATGWEb1 server.
var dec = function (req, res, callback) {
    axios.get('http://atgtravel.com/portal/apiUser.cfm?value=req.d&type=dec')
    .then(response => {
        callback(response.data);
    })
    .catch(error => {
        console.log(error);
        callback(null,error);
    });
};

module.exports = {
    enc,
    dec
   };