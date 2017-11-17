var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require("./models/campground");
var Comment = require('./models/comment');
var seedDB = require('./seeds');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');


//Creating the Connection
mongoose.connect('mongodb://localhost/yelp_camp');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
seedDB();

// ===== PASSPORT CONFIGURATION =====
app.use(require('express-session')({
    secret: "Gostaria que todo mundo morresse",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Root path
app.get('/', function(req, res){
    res.render('landing');
});

//POST - Add a new campground for DB
app.get('/campgrounds', function(req, res){
    //Getting the campgrounds from de DB
    Campground.find({}, function(err, allCampgrounds){
        if(err)
            console.log(err);
        else
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
    });
});

//INDEX - Display a list of all campgrounds
app.post('/campgrounds', function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    
    var newCampgroud ={
      name: name,
      image: image,
      description: description
    };
    
    Campground.create(newCampgroud, function(err, callbackNewCampground){
        if(err)
            console.log(err)
        else
            res.redirect('/campgrounds');
    });
});

//NEW - Display form to make a new campground
app.get('/campgrounds/new', function(req, res){
    res.render('campgrounds/new');
});

//Show - Show info about one campground
app.get('/campgrounds/:id', function(req, res){
    
    Campground.findById(req.params.id).populate('comments').exec(function(err, campgroundId){
        if(err)
            console.log(err);
        else
            //Render the template with the campgrounds id
            res.render('campgrounds/show', {campground: campgroundId});
    });
});

// =========================
// COMMENTS ROUTES
// =========================

app.get('/campgrounds/:id/comments/new', function(req, res) {
    //Find by Id than going throw the render
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log('Não foi possível encontrar o Campground');
        }else{
            res.render('comments/new', {campground: campground});
        }
    });
});

app.post('/campgrounds/:id/comments', function(req, res){
    
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

// ============== AUTH ROUTES ================
// show register form
app.get('/register', function(req, res){
   res.render('register'); 
});

//handle sign up logic
app.post('/register', function(req, res){
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
app.get('/login', function(req, res){
   res.render('login'); 
});

//handle login logic - middleware
app.post('/login', passport.authenticate('local',{
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function(req, res){
    
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log('The server has started!'); 
});