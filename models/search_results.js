
var mongoose = require("mongoose");

var searchResults = new mongoose.Schema({
    term : String,
    when : Date
});

mongoose.model("Search", searchResults);