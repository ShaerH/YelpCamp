var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");

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
});

//CREATE route   create a new campground
router.post("/",middleware.isLoggedIn, (req, res) => {
    // get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name:name, image:image, description:desc, author:author};

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
router.get("/new", middleware.isLoggedIn, (req, res) => {

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

});

//EDIT route
router.get("/:id/edit", middleware.checkCampgroundOwner, (req,res)=>{
    
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/edit", {campground: foundCampground});

        }
    });
    
    
});
//UPDATE
router.put("/:id", middleware.checkCampgroundOwner, function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground){
        if(err){
            res.redirect("/campgrounds");
        }else {
            res.redirect("/campgrounds/" + req.params.id);

        }
    });
});
//DELETE
router.delete("/:id", middleware.checkCampgroundOwner, (req,res)=>{
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
        }
    });
});





module.exports = router;