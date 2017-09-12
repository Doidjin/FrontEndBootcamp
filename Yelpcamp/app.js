var express = require('express');
var app = express();

app.set('view engine', 'ejs');

//Root path
app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    var campgrounds = [
        {name: 'Salmon Creek', image: 'http://blog.cremonesi.com.br/wp-content/uploads/2017/03/camping-voyageurs-national-park-tent.jpg.rend_.tccom_.1280.960.jpeg'},
        {name: 'Granite Hill', image: 'http://s3.amazonaws.com/ncc-ccn/images/camping-card.jpg?mtime=20170425165109'},
        {name: 'Mountain Goats rest', image: 'http://blog.lojadecamping.com.br/wp-content/uploads/caaaam.jpg'}
    ];
    
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log('The server has started!'); 
});