var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require("./models/post");

var User = require("./models/user");

/*
Post.create({
   title: "Tesging post for bob Pt 3",
   content: "BLA BLA BLA"
}, function(err, post){
    if(err)
        console.log(err);
    else{
        User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
            if(err)
                console.log(err);
            else{
                foundUser.posts.push(post);
                foundUser.save(function(err, data){
                    if(err)
                        console.log(err);
                    else
                        console.log(data);
                })
            }
        });
    }
});
*/

/*
User.create({
   email: "bob@gmail.com",
   name: "Bob Esponja"
});
*/

// Find User
// Find all posts for that User

User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
   if(err)  console.log(err);
   else     console.log(user);
});

