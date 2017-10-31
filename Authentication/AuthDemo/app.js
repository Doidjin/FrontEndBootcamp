var express               = require('express');
var mongoose              = require('mongoose');
var passport              = require('passport');
var bodyParser            = require('body-parser');
var LocalStrategy         = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User                  = require('./models/user');

mongoose.connect('mongodb://localhost/auth_demo_app');

var app = express();
app.set('view engine', 'ejs');
app.use(require('express-session')({
    secret: "Teste",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

// read the session / taking the data from the session that's enconded and unencode it
// encoding / serializing / put back to the session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ================================================================================================================
// ROUTES
// ================================================================================================================

// ROOT ROUTE
app.get('/', function(req, res){
   res.render('home');
});

// SECRET ROUTE
app.get('/secret', function(req, res){
    res.render('secret');
});

// AUTH ROUTES

// show sign up form
app.get('/register', function(req, res){
    res.render('register');
});

//handling user sign up
app.post('/register', function(req, res){
   User.register(new User({username: req.body.username}), req.body.password, function(err, user){
      if(err){
          console.log(err);
          return res.render('register');
      } 
      passport.authenticate('local')(req, res, function(){
          res.redirect('/secret');
      });
   });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log('The server has started!'); 
});