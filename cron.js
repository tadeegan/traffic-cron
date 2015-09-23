var fs = require('fs');

var API_KEY = require('./keys').google_maps_api_key;

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
    host: 'https://maps.googleapis.com',
    path: '/maps/api/directions/json?origin=965 Twin Brook Dr San Jose CA&destination=1365 Charelston Ave Mountain View CA&key=' + API_KEY
};

var request = require("request");

request(options.host + options.path, function(error, response, body) {
    var a = JSON.parse(body);
    var length = a.routes[0].legs[0].duration.value;
    console.log(length);
    store_duration(length);
});

function store_duration(duration) {
    var time = new Date().getTime() / 1000;
    var line = time + "\t" + duration + "\n"
    console.log(line);
    fs.appendFile('data.csv', line, function (err) {
        if(err)
            console.error(err);
    });
}