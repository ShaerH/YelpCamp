var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//SCHEMA setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({}, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("NEWLY CREATED CAMPGROUND");
//         console.log(campground);
//     }
        
// });

var campgrounds = [
        {name: "Salmon Creek", image: "https://www.nps.gov/shen/planyourvisit/images/20170712_A7A9022_nl_Campsites_BMCG_960.jpg?maxwidth=1200&maxheight=1200&autorotate=false"},
        {name: "Montain Goats", image: "http://www.road-trip-usa.com/uploads/6/1/9/4/61940309/ventana-campground-campgrounds-in-big-sur_orig.jpg"},
        {name: "Granite Hill", image: "https://dailygazette.com/sites/default/files/styles/article_image/public/180702d.jpg?itok=6L_qDMLP"}
        ];

app.get("/", function(req, res) {
    res.render("landing");
});

// show all campgrounds
app.get("/campgrounds", function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds",{campgrounds: allcampgrounds});
        }
    });
//   res.render("campgrounds",{campgrounds: campgrounds}); 
});

//create a new campground
app.post("/campgrounds", function(req, res){
    // get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image};
    //Create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
                // redirect back to campgrounds page
                res.redirect("/campgrounds");
        }
    });

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