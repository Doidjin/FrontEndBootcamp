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
router.get('/register', function(req, res){
   res.render('register'); 
});

//handle sign up logic
router.post('/register', function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.render('register');
       } else{
           passport.authenticate('local')(req, res, function(){
               res.redirect('/campgrounds');
           });
       }
    });
});

//show login form
router.get('/login', function(req, res){
   res.render('login'); 
});

//handle login logic - middleware
router.post('/login', passport.authenticate('local',{
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function(req, res){
    
});

// logout logic
router.get('/logout', function(req, res){
   req.logout(); 
   res.redirect('/campgrounds')
});

// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;