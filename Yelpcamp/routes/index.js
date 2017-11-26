var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

//Root path
router.get('/', function(req, res){
    res.render('landing');
});


// ============== AUTH ROUTES ================
// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//handle sign up logic
router.post('/register', function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
       if(err){
           return res.render("register", {error: err.message});
       } else{
           passport.authenticate('local')(req, res, function(){
               req.flash("success", "Welcome to YelpCamp " + user.username);
               res.redirect('/campgrounds');
           });
       }
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//handle login logic - middleware
router.post('/login', passport.authenticate('local',{
        successRedirect: '/campgrounds',
        failureRedirect: '/login',
        failureFlash: true
}), function(req, res){
    
});

// logout logic
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/campgrounds");
});


module.exports = router;