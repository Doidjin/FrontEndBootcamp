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
               // DOES THE USER OWN THE CAMPGROUND?
                if(foundCampground.author.id.equals(req.user._id)){
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

middlewareObj.checkCommentOwnership = function(req, res, next){
    // IS USER LOGGED IN?
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err) {
                console.log(err);
                res.redirect('back');
           } else {
               // DOES THE USER OWN THE COMMENT?
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
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect('/login');

}

module.exports = middlewareObj;