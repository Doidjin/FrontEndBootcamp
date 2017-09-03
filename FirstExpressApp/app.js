var express = require('express');
var app = express();

app.get('/', function(req, res){
    //console.log("Hello!");
    res.send("Hello!");
});

app.get('/bye', function(req, res){
    res.send('Goodbye');
});

app.get('/dog', function(req, res){
    res.send('Meow');
});

//Makes a pattern to match any route in /r/anyNameHere
app.get('/r/:subredditName', function(req, res){
    
   res.send("Welcome to! " + req.params.subredditName); 
});

//Make the route to any route that isn't exist and do the function
//Match any route
app.get('*', function(req, res){
    res.send('Test');
});

//Tells the express to listen to a request
//Cloud 9 server Port == 3000
//Particular IP that Cloud 9 expect
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});