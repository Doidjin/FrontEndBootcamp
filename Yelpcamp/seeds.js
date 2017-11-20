var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

//Uncomment latter!!!

/*
var data = [
        {
            name: 'Teste', 
            image: 'https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg',
            description: 'Teste description'
        },
        {
            name: 'Teste 2', 
            image: 'https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg',
            description: 'Teste description 2'
        }
    ];

*/

function seedDB(){
//    Remove all campgrounds
//    Campground.remove({}, function(err){
//        if(err){
//           console.log(err);
//        }
//        console.log('removed campgrounds');
//        //Add a few campgrounds
//        data.forEach(function(seed){
//            Campground.create(seed, function(err, campground){
//                if(err)
//                    console.log(err);
//               console.log('Added a campground');
//               //Create a comment
//                Comment.create(
//                        {
//                            text: 'Teste 3',
//                            author: 'Teste 4'
//                        }, function(err, comment){
//                            if(err)
 //                              console.log(err);
//                            campground.comments.push(comment);
//                            campground.save();
//                            console.log('Created new comments');
//                        });
//             });
//        });
//    });
}


module.exports = seedDB;
