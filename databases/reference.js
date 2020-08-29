const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blog_demo_2',{
useNewUrlparse: true,
useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

const Post = require('./models/post');
const User = require('./models/user');



// User.create({
//     email: 'jeff@amazon.com',
//     name: "Jeff Bezos"
// })

Post.create({
    title: 'how to NOT to Highline',
    content: 'do not get killed'
}, (err, post)=>{

    User.findOne({name: 'Jeff Bezos'}, (err, foundUser)=>{
        if(err){
            console.log(err);
        }
        else{
            foundUser.posts.push(post);
            foundUser.save((err, data)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(data);
                }
            })
        }
    })
})

// User.findOne({email: 'jeff@amazon.com'}).populate('posts').exec((err, user)=>{
//     if(err){
//         console.log(err);
//     }
//     else {
//         console.log(user);
//     }
// });