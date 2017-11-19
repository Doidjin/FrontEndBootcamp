var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

// INDEX - Show all Campgrounds
router.get('/', function(req, res){
    //Getting the campgrounds from de DB
    Campground.find({}, function(err, allCampgrounds){
        if(err)
            console.log(err);
        else
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
    });
});

//CREATE - Add a new Campground to BD
router.post('/', isLoggedIn , function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    
    var newCampgroud ={
      name: name,
      image: image,
      description: description,
      author: author
    };
    
    Campground.create(newCampgroud, function(err, callbackNewCampground){
        if(err)
            console.log(err)
        else
            res.redirect('/campgrounds');
    });
});

//NEW - Display form to make a new campground
router.get('/new', isLoggedIn ,function(req, res){
    res.render('campgrounds/new');
});

//SHOW - Show info about one campground
router.get('/:id', function(req, res){
    
    Campground.findById(req.params.id).populate('comments').exec(function(err, campgroundId){
        if(err)
            console.log(err);
        else
            //Render the template with the campgrounds id
            res.render('campgrounds/show', {campground: campgroundId});
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