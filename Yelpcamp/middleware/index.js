// all the middleware goes here

var middlewareObj = {};
var Campground = require('../models/campground');
var Comment = require('../models/comment');

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    // IS USER LOGGED IN?
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err) {
                console.log(err);
                res.redirect('back');
           } else {
                // Added this block, to check if foundCampground exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
                if (!foundCampground) {
                        req.flash("error", "Item not found.");
                        return res.redirect("back");
                    }
               
               // DOES THE USER OWN THE CAMPGROUND?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();                    
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
           }
        });        
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    // IS USER LOGGED IN?
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err) {
                req.flash("error", "Campground not found");
                res.redirect('back');
           } else {
               // DOES THE USER OWN THE COMMENT?
                if(foundComment.author.id.equals(req.user._id)){
                    next();                    
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
           }
        });        
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;