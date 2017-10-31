var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require("./models/campground");
var Comment = require('./models/comment');
var seedDB = require('./seeds');


//Creating the Connection
mongoose.connect('mongodb://localhost/yelp_camp');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
seedDB();

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

app.listen(process.env.PORT, process.env.IP, function(){
   console.log('The server has started!'); 
});