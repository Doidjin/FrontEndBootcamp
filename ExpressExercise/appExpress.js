var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Hi there, welcome to my assignment');
});

app.get('/speak/:name', function(req, res){
    var sounds = {
        pig: 'Oink',
        cow: 'Moow',
        dog: 'woof'
    };
    
    var animal = req.params.name;
    
    res.send('The ' + animal + ' says ' + sounds[animal]);
        
});

app.get('/repeat/:someThing/:number', function(req, res){
    
    var message = req.params.someThing;
    var times = Number(req.params.number);
    var result = '';
    
    for(var i = 0; i < times; i++){
        result += message + ' ';
    }
    
    res.send(result);
});

app.get('*', function(req, res){
    res.send('Sorry, page not found...');
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started");
});