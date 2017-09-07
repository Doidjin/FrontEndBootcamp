var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//body-parser took the request body and parsed into a javascript object
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

var friends = ['Nenhum', 'Nada', 'Ninguem'];

app.get('/', function(req, res){
    res.render('home');
});

app.post('/addfriend', function(req, res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    //Redirect to the /friends route
    res.redirect('/friends');
});

app.get('/friends', function(req, res){

    res.render('friends', {friends: friends});
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log('The server has started!!'); 
});