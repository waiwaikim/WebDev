const mongoose = require("mongoose");
const Climbinggym = require("./models/climbinggym");
const Comment   = require("./models/comment");

 
// const data = [
//     {
//         name: "First Ascent", 
//         image: "https://s3.amazonaws.com/images.gearjunkie.com/uploads/2018/09/earth-treks-north-americas-largest-climbing-gym1.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//     },
//     {
//         name: "Desert Mesa", 
//         image: "https://www.climbing.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTYwMDI3OTU0MTI5MjE3NTEz/brittany-gym_gn-ce-web.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//     },
//     {
//         name: "Vertical Limit", 
//         image: "https://d2u8towkwolubl.cloudfront.net/wp-content/uploads/2019/08/DSC_111211.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//     }
// ]
 
function seedDB(){
   //Remove all campgrounds
   Climbinggym.remove({}, (err)=>{
        if(err){
            console.log(err);
        }
        console.log("removed climbinggym!");
        Comment.remove({}, (err)=>{
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            // data.forEach((seed)=>{
            //     Climbinggym.create(seed, (err, climbinggym)=>{
            //         if(err){
            //             console.log(err)
            //         } else {
            //             console.log("added a climbinggym");
            //             //create a comment
            //             Comment.create(
            //                 {
            //                     text: "This place is great, but I wish there was internet",
            //                     author: "Homer"
            //                 }, (err, comment)=>{
            //                     if(err){
            //                         console.log(err);
            //                     } else {
            //                         climbinggym.comments.push(comment);
            //                         climbinggym.save();
            //                         console.log("Created new comment");
            //                     }
            //                 });
            //         }
            //     });
            // });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;