var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blog_demo");

// POST
var postSchema = new mongoose.Schema({
   title: String,
   content: String
});
var Post = mongoose.model("Post", postSchema);

// USER
var userSchema = new mongoose.Schema({
   email: String,
   name: String,
   posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

/*
var newUser = new User({
   email: "Teste@teste.com",
   name: "Teste"
});

newUser.posts.push({
   title: "Testing title",
   content: "Testing content"
});

newUser.save(function(err, user){
    if(err)
        console.log(err);
    else
        console.log(user);
});
*/

/*
var newPost = new Post({
   title: "Testeing Associations",
   content: "Making a test with associations" 
});
newPost.save(function(err, post){
    if(err)
        console.log(err);
    else
        console.log(post);
});
*/

User.findOne({name: 'Teste'}, function(err, user){
   if(err)
        console.log(err);
    else{
        user.posts.push({
            title: "Testing another title",
            content: "Testing another content"
        });
        user.save(function(err, newUser){
            if(err)
                console.log(err);
            else
                console.log(newUser);
        })
    }
        
});