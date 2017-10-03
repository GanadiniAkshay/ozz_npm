###NPM package to log data to ozz

####Usage

######Installation
npm install ozz

######Usage
const ozz_setup = {
    "pat":"pat",
    "pid":"pid",
    "bot_guid":"1da94dd2-9bdf-11e7-9399-0242ac110007"
}

const ozz = require('../index')(ozz_setup); 

const message = "hi";

ozz.message(message)
    .then( function(body){
        console.log(body);
    })
    .catch(function(error)){
        console.log(error);
    })
