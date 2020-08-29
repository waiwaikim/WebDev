const mongoose = require("mongoose")
// ODM = object data mapper = way to write js interacting with DB. JS layer on top of MongoDB 
mongoose.connect('mongodb://localhost:27017/cat_app',{
    useNewUrlparse: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String 
});

const Cat = mongoose.model("Cat", catSchema);

//adding a new cat to the database 
// const george = new Cat({
//     name: 'Mrs. Norris',
//     age: 100,
//     temperament: 'evil'
// });

// george.save((err, cat) =>{
//     if(err){
//         console.log("something went wrong");
//     }
//     else{
//         console.log("We have just saved a cat to DB:");
//         console.log(cat);
//     }
// })

Cat.create({
    name: 'snowwhite',
    age: 7,
    temperament: 'nice'
}, (err, cat)=>{
    if(err){
        console.log('error');
    }
    else{
        console.log(cat);
    }
});

//retrive all cats

Cat.find({}, (err, cats )=>{
    if(err){
        console.log('Something went wrong');
    }
    else{   
        console.log('all the cats: ');
        console.log(cats);
    }
})
