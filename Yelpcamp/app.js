var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Creating the Connection
mongoose.connect('mongodb://localhost/yelp_camp');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


//Setting up the Schema
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

//Setting the Model
var Campground = mongoose.model('Campground', campgroundSchema);

/*
//Setting the Creates
Campground.create({
    name: 'Mountain Goats rest',
    image: 'http://blog.lojadecamping.com.br/wp-content/uploads/caaaam.jpg',
    description: 'This is a hude Mountain Goats rest!'
}, function(err, campground){
    if(err)
        console.log(err);
    else
        console.log(campground);
});
*/


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
            res.render('index', {campgrounds: allCampgrounds});
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
    res.render('new');
});

//Show - Show info about one campground
app.get('/campgrounds/:id', function(req, res){
    
    Campground.findById(req.params.id, function(err, campgroundId){
        if(err)
            console.log(err);
        else
            //Render the template with the campgrounds id
            res.render('show', {campground: campgroundId});
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log('The server has started!'); 
});