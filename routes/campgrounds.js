var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


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
router.post("/",isLoggedIn, (req, res) => {
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
router.get("/new", isLoggedIn, (req, res) => {

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

//EDIT route
router.get("/:id/edit", checkOwner, (req,res)=>{
    
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
    
    
});
//UPDATE
router.put("/:id", checkOwner, function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground){
        if(err){
            res.redirect("/campgrounds");
        }else {
            res.redirect("/campgrounds/" + req.params.id);

        }
    });
});
//DELETE
router.delete("/:id", checkOwner, (req,res)=>{
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    });
});

function checkOwner(req,res,next){
     if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground) {
            if(err){
                res.redirect("back");
            }else {
                if(foundCampground.author.id.equals(req.user._id)){
                    res.render("campgrounds/edit",{campground:foundCampground});
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;