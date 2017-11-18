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
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
    
});

// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;