var express = require('express'),
        app = express(),
        bodyBarser = require('body-parser'),
        mongoose = require('mongoose');
        
mongoose.connect('mongodb://localhost/restful_blog_app');

// APP CONFIG
app.use(express.static('public'));
app.use(bodyBarser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// MONGOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {
        type: Date,
       default: Date.now
       
   }
});

var Blog = mongoose.model('Blog', blogSchema);

/*
Blog.create({
   title: 'Test Blog',
   image: 'https://www.clubeparacachorros.com.br/wp-content/uploads/2014/06/pug-rindo.jpg',
   body: 'Hello, this is a Blog POST!'
   //created: 
});
*/

// RESTFUL ROUTES
// ROOT ROUTE
app.get('/', function(req, res){
    res.redirect('/blogs');
});

// INDEX ROUTE
app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
       if(err)
            console.log(err);
        else
            res.render('index', {blogs: blogs});            
    });
});




app.listen(process.env.PORT, process.env.IP, function(){
   console.log('The server has started!'); 
});