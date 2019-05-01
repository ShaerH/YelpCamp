var express = require("express");
var router = express.Router();
var Campground = require("../models/campground")

//INDEX route
// show all campgrounds
router.get("/", (req, res) => {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds: allcampgrounds, currentUser: req.user});
        }
    });
//   res.render("campgrounds",{campgrounds: campgrounds}); 
});

//CREATE route   create a new campground
router.post("/", (req, res) => {
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

//NEW route - show the form that will send the data to post route above
router.get("/new", (req, res) => {

   res.render("campgrounds/new");

});

//SHOW page route Show more info about one campground
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            // console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    req.params.id;
    
});

module.exports = router;