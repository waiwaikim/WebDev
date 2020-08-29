
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      Climbinggym = require('./models/climbinggym'),
      Comment = require('./models/comment'),
      seedDB = require('./seeds');


const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
console.log(__dirname);

//seedDB();
//Connecting to DB  
mongoose.connect('mongodb://localhost:27017/yelp_camp',{
    useNewUrlparse: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));




app.get('/', (req,res)=>{

    res.render('landing');
})

//INDEX
app.get('/climbinggyms', (req, res)=>{

    //Get all climbing gyms from DB 
    Climbinggym.find({}, (err, allClimbingGyms)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log()
            res.render('climbinggyms/index', {gyms: allClimbingGyms});
        }
    })
})

//CREATE
app.post('/climbinggyms', (req, res)=> {
    const name = req.body.name;
    const url = req.body.image; 
    const desc = req.body.description;
    const newClimbingGym = {name: name, image: url, description: desc};

    //Database! 
    //Create a new climbing gym and save to DB
    Climbinggym.create(newClimbingGym, (err, newlyCreated)=>{
        if(err){
            console.log(err);
        }
        else{
            // redirect back to climbing page
            res.redirect("/climbinggyms");
        }
    })
})


//NEW - show form to create new climbing gym 
app.get('/climbinggyms/new', (req, res)=> {
    res.render('climbinggyms/new');
})

//SHOW
app.get('/climbinggyms/:id', (req, res)=>{
    //find the climbing gym with provided ID
    //render show the template 

    Climbinggym.findById(req.params.id).populate("comments").exec( (err, foundClimbingGym)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(foundClimbingGym);
            res.render('climbinggyms/show', {gyms: foundClimbingGym});
        }
    })
})

//=======================================
//COMMENT ROUTES
//=======================================

app.get('/climbinggyms/:id/comments/new', (req, res)=>{

    Climbinggym.findById(req.params.id, (err, foundClimbingGym)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('comments/new', {climbinggym: foundClimbingGym});
        }
    })
})

app.post('/climbinggyms/:id/comments', (req, res)=>{
    Climbinggym.findById(req.params.id, (err, foundClimbingGym)=>{
        if(err){
            console.log(err);
            res.redirect('climbinggyms');
        }
        else{
            Comment.create(req.body.comment, (err, comment)=>{
                if(err){
                    console.log(err);
                }
                else{
                    foundClimbingGym.comments.push(comment);
                    foundClimbingGym.save();
                    res.redirect('/climbinggyms/' +foundClimbingGym._id );
                }
            })
        }
    })
})

app.listen(port, function(){ 
    console.log('YelpProject app is listening.')
});