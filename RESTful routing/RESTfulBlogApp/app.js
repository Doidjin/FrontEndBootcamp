var express = require('express'),
        methodOverride = require('method-override'),
        expressSanitizer = require('express-sanitizer'),
        app = express(),
        bodyBarser = require('body-parser'),
        mongoose = require('mongoose');
        
mongoose.connect('mongodb://localhost/restful_blog_app');

// APP CONFIG
app.use(express.static('public'));
app.use(bodyBarser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));
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

//NEW ROUTE
app.get('/blogs/new', function(req, res){
   res.render('new');
});

//CREATE ROUTE
app.post('/blogs', function(req, res){
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.create(req.body.blog, function(err, newBlog){
        if(err)
            console.log(err);
        else
            res.redirect('/blogs');
   });
});

//SHOW ROUTE
app.get('/blogs/:id', function(req, res){
   Blog.findById(req.params.id, function(err, blogId){
       if(err)
            res.redirect('/blogs');
        else
            res.render('show', {blog: blogId})
   }); 
});

//EDIT ROUTE
app.get('/blogs/:id/edit', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err)
            res.redirect("/blogs");
        else
            res.render('edit', {blog: foundBlog});
    });
});

//UPDATE ROUTE
app.put('/blogs/:id', function(req, res){
    req.body.blog.body = req.sanitizer(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err)
            res.redirect('/blogs');
        else
            res.redirect('/blogs/' + req.params.id);
    });
});

//DELETE ROUTE
app.delete('/blogs/:id', function(req, res){
   Blog.findByIdAndRemove(req.params.id, function(err){
        if(err)
            res.redirect('/blogs');
        else
            res.redirect('/blogs');
   });
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log('The server has started!'); 
});