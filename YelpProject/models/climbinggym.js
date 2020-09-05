const mongoose = require('mongoose');

const clibminggymSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author:{
        id :{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
},
{
    timestamps: true
});

//Compile schema to model
const Climbinggym = mongoose.model("Climbinggym", clibminggymSchema);
module.exports = Climbinggym;

// Climbinggym.create({
//     name: 'Brooklyn Boulder', 
//     image: 'https://gripped.com/wp-content/uploads/2018/02/Climbing-Gym3.jpeg',
//     description: 'Why is this so freaking expesnive'
//     },
//     (err, climbinggym)=> {
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("NEWLY CREATED CLIMBING GYM");
//         console.log(climbinggym);
//     }

// });