var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');

//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
       }
    });
});

//CREATE - Add a new Campground to BD
router.post('/', middleware.isLoggedIn , function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var price = req.body.price;
    
    var newCampgroud ={
      name: name,
      image: image,
      description: description,
      author: author,
      price: price
    };
    
    Campground.create(newCampgroud, function(err, callbackNewCampground){
        if(err)
            console.log(err)
        else
            res.redirect('/campgrounds');
    });
});

//NEW - Display form to make a new campground
router.get('/new', middleware.isLoggedIn ,function(req, res){
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

// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership , function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }
        res.render('campgrounds/edit', {campground: foundCampground});                     
    });        
});

// UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnership , function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground ,function(err, updatedCampground){
        if(err) {
            console.log(err);
            res.redirect('/campgrounds');  
        } else {
            res.redirect('/campgrounds/' + updatedCampground._id);
        }
    }); 
});

// DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership , function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, deleteCamground){
       if(err) {
           res.redirect('/campgrounds');
       } else {
           res.redirect('/campgrounds');
       }
    });
});


module.exports = router;