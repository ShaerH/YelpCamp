var express = require("express");
var app = express();



app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render("landing");
})

app.get("/campgrounds", function(req, res) {
    var campgrounds = [
        {name: "Salmon Creek", image: "https://www.nps.gov/shen/planyourvisit/images/20170712_A7A9022_nl_Campsites_BMCG_960.jpg?maxwidth=1200&maxheight=1200&autorotate=false"},
        {name: "Montain Goats", image: "http://www.road-trip-usa.com/uploads/6/1/9/4/61940309/ventana-campground-campgrounds-in-big-sur_orig.jpg"},
        {name: "Granite Hill", image: "https://dailygazette.com/sites/default/files/styles/article_image/public/180702d.jpg?itok=6L_qDMLP"}
        ]
   res.render("campgrounds",{campgrounds: campgrounds}); 
});

app.get("*", function(req, res){
    res.send("Error page");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp app has started!!");
});