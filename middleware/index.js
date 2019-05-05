//All middleware goes
var Campground = require("../models/campground");
var Comment = require("../models/comment");

let middlewareObject = {};
middlewareObject.checkCampgroundOwner = (req,res,next)=>{
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
        req.flash("error","You need to be logged in");
        res.redirect("back");
    }
};

middlewareObject.checkCommentOwner = (req,res,next) =>{
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err){
                res.redirect("back");
            }else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};
middlewareObject.isLoggedIn=(req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in");
    res.redirect("/login");
}

module.exports = middlewareObject;