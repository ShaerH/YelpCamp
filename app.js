var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render("landing");
});

var campgrounds = [
        {name: "Salmon Creek", image: "https://www.nps.gov/shen/planyourvisit/images/20170712_A7A9022_nl_Campsites_BMCG_960.jpg?maxwidth=1200&maxheight=1200&autorotate=false"},
        {name: "Montain Goats", image: "http://www.road-trip-usa.com/uploads/6/1/9/4/61940309/ventana-campground-campgrounds-in-big-sur_orig.jpg"},
        {name: "Granite Hill", image: "https://dailygazette.com/sites/default/files/styles/article_image/public/180702d.jpg?itok=6L_qDMLP"}
        ]
        
// show all campgrounds
app.get("/campgrounds", function(req, res) {
    
   res.render("campgrounds",{campgrounds: campgrounds}); 
});

//create a new campground
app.post("/campgrounds", function(req, res){
    // get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image};
    campgrounds.push(newCampground);
    
    // redirect back to campgrounds page
    res.redirect("/campgrounds");

});

//show the form that will send the data to post route above
app.get("/campgrounds/new", function(req, res) {

   res.render("new.ejs");

});

app.get("*", function(req, res){
    res.send("Error page");
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp app has started!!");
});