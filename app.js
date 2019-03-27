var express = require("express");
var app = express();

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.send("search");
})

app.get("*", function(req, res){
    res.send("Error page");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp app has started!!");
});