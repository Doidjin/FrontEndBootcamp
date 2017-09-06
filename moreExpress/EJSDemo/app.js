var express = require('express');
var app = express();

//Tells the express to "import" the folder named public to be used
app.use(express.static('public'));

//We remove the .ejs of our render
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    //Returns the rendered HTML of a view via the callback function
    res.render("home");
    res.send('Welcome to the home page');
});

app.get('/fallinlovewith/:id', function(req, res){
    var name = req.params.id;
    
    //Passing throw a parameter my object to feel the EJS
    res.render('love', {nameVar: name});
});

app.get('/posts', function(req, res){
    var posts = [
        {title: 'Post1', author: 'Suzy'},
        {title: 'Post2', author: 'Xena'},
        {title: 'Post3', author: 'Xana'},
        {title: 'Post4', author: 'Mama'},
    ];
    
    res.render('posts', {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('The server has started');
});