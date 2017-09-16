var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgrounds = [
    {name: 'Salmon Creek', image: 'http://blog.cremonesi.com.br/wp-content/uploads/2017/03/camping-voyageurs-national-park-tent.jpg.rend_.tccom_.1280.960.jpeg'},
    {name: 'Granite Hill', image: 'http://s3.amazonaws.com/ncc-ccn/images/camping-card.jpg?mtime=20170425165109'},
    {name: 'Mountain Goats rest', image: 'http://blog.lojadecamping.com.br/wp-content/uploads/caaaam.jpg'}
];

//Root path
app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    
    var newCampgroud ={
      name: name,
      image: image
    };
    
    campgrounds.push(newCampgroud);
    //get data from form and add to campgrouds array
    //redirect back to campgrouds
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res){
    res.render('new');
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log('The server has started!'); 
});