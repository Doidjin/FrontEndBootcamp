var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cats_app');

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});


//Getting the schema, compiling into a model.
var Cat = mongoose.model('Cat', catSchema);
/*
var george = new Cat({
   name: 'Felipe',
   age: 3,
   temperament: 'Filho'
});

george.save(function(err, cat){
    
    if(err)
        console.log(err);
    else
        console.log(cat);
        
});
*/

//Creating a cat
Cat.create({
    name: 'Elle',
    age: 5,
    temperament: 'Muito calma'
}, function(err){
    if(err)
        console.log(err);
});

//Retrieves all cats form de DB and console log each one
Cat.find({
   //name: 'Felipe' 
}, function(err, docs){
    if(err)
        console.log(err);
    else
        console.log(docs);
});