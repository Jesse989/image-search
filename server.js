var express = require("express");
require("./models/search_results");
var api = require("./routes/api");
var mongoose = require("mongoose");




var app = express();


mongoose.connect('mongodb://'+process.env.USER+':'+process.env.PW+'@ds011735.mlab.com:11735/ecommerce');

app.use('/api', api);

app.use(express.static(__dirname + '/public'));



//search('feet', 10);

var port = (process.env.PORT || 3000);

app.listen(port, function(){
    console.log("listening on port: "+port+"...")
})