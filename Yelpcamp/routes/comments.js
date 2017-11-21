// =========================
// COMMENTS ROUTES
// =========================
var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');

router.get('/new', isLoggedIn , function(req, res) {
    //Find by Id than going throw the render
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log('Não foi possível encontrar o Campground');
        }else{
            res.render('comments/new', {campground: campground});
        }
    });
});

router.post('/', isLoggedIn , function(req, res){
    
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');            
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
    
});

// COMMENT EDIT ROUTE
router.get('/:comment_id/edit', checkCommentOwnership , function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err) {
            res.redirect("back");
       }else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
       }
    });
});

// COMMENT UPDATE ROUTE
router.put('/:comment_id', checkCommentOwnership , function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete('/:comment_id', checkCommentOwnership , function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, deleteComment){
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// middlewares
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

function checkCommentOwnership(req, res, next){
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

module.exports = router;