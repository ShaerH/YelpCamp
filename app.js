let express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground.js"),
    seedDB      = require("./seeds");

// seedDB();
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// Campground.create(
//     {name: "Granite Hill", 
//     image: "https://dailygazette.com/sites/default/files/styles/article_image/public/180702d.jpg?itok=6L_qDMLP",
//     description: "This is a huge hill no water but its ok"
//     }, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("NEWLY CREATED CAMPGROUND");
//         console.log(campground);
//     }
// });

// let campgrounds = [
//         {name: "Salmon Creek", image: "https://www.nps.gov/shen/planyourvisit/images/20170712_A7A9022_nl_Campsites_BMCG_960.jpg?maxwidth=1200&maxheight=1200&autorotate=false"},
//         {name: "Montain Goats", image: "http://www.road-trip-usa.com/uploads/6/1/9/4/61940309/ventana-campground-campgrounds-in-big-sur_orig.jpg"},
//         {name: "Granite Hill", image: "https://dailygazette.com/sites/default/files/styles/article_image/public/180702d.jpg?itok=6L_qDMLP"}
//         ];

// app.get("/", function(req, res) {
//     res.render("landing");
// });


//Index route
// show all campgrounds
app.get("/campgrounds", (req, res) => {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index",{campgrounds: allcampgrounds});
        }
    });
//   res.render("campgrounds",{campgrounds: campgrounds}); 
});

//Create route   create a new campground
app.post("/campgrounds", (req, res) => {
    // get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description: desc};
    //Create a new campground and save to db
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else {
                // redirect back to campgrounds page
                res.redirect("/campgrounds");
        }
    });

});

//New route
//show the form that will send the data to post route above
app.get("/campgrounds/new", (req, res) => {

   res.render("new.ejs");

});

//Show page route Show more info about one campground
app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("show", {campground: foundCampground});
        }
    });
    req.params.id;
    
});



app.get("*", (req, res) => {
    res.send("Error page");
});
app.listen(process.env.PORT, process.env.IP, () => {
    console.log("YelpCamp app has started!!");
});