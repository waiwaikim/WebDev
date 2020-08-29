const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blog_demo',{
useNewUrlparse: true,
useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

//POST - title, content 
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Post = mongoose.model("Post", postSchema);

//USER - email, name
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
const User = mongoose.model("User", userSchema);



// const newUser = new User({
//     email: "barackObama@usa.com",
//     name: "Barack Obama"
// });
// newUser.posts.push({
//     title: "Inauguration speech",
//     content: "Yes We can"
// })
// const newPost = new Post();

// newUser.save((err, user)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(user);
//     }
// })



// User.findOne({name: 'Barack Obama'}, (err, user)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         user.posts.push({
//             title: "babababa",
//             content: "blap blap balp"
//         });

//         user.save((err, user)=>{
//             if(err){
//                 console.log(err);
//             }
//             else {
//                 console.log(user);
//             }
//         })
//     }
// })