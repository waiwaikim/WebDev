const express = require('express'),
      Climbinggym = require('../models/climbinggym');
const router =  express.Router(); 

//INDEX
router.get('/', (req, res)=>{
    
    ;    //Get all climbing gyms from DB 
        Climbinggym.find({}, (err, allClimbingGyms)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log()
                res.render('climbinggyms/index', {gyms: allClimbingGyms});
            }
        })
    });
    
//CREATE
router.post('/', isLoggedIn,(req, res)=> {
    const name = req.body.name;
    const url = req.body.image; 
    const desc = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newClimbingGym = {name: name, image: url, description: desc, author: author};

    //Database! 
    //Create a new climbing gym and save to DB
    Climbinggym.create(newClimbingGym, (err, newlyCreated)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(newlyCreated);
            // redirect back to climbing page
            res.redirect("/climbinggyms");
        }
    })
});


//NEW - show form to create new climbing gym 
router.get('/new', isLoggedIn, (req, res)=> {
    res.render('climbinggyms/new');
});

//SHOW
router.get('/:id', (req, res)=>{
    //find the climbing gym with provided ID
    //render show the template 

    Climbinggym.findById(req.params.id).populate("comments").exec( (err, foundClimbingGym)=>{
        if(err){
            console.log(err);
        }
        else{
            //console.log(foundClimbingGym);
            res.render('climbinggyms/show', {gyms: foundClimbingGym});
        }
    })
});

//EDIT
router.get('/:id/edit', climbinggymOwnership, (req,res)=>{

    Climbinggym.findById(req.params.id, (err, foundClimbingGym)=>{
        if(err){
            console.log(err);
            res.redirect('/climbinggyms');
        }
        else{
            res.render('climbinggyms/edit', {climbinggym: foundClimbingGym})
        }
    })
});

//UDPATE
router.put('/:id', climbinggymOwnership, (req, res)=>{
    Climbinggym.findByIdAndUpdate(req.params.id, req.body.climbinggym, (err, updatedGym)=>{
        if(err){
            console.log(err);
            res.redirect('/climbinggyms');
        }
        else{
            res.redirect('/climbinggyms/' + req.params.id);
        }
    })
});

//DELTE 
router.delete('/:id', climbinggymOwnership, (req,res)=>{
    Climbinggym.findByIdAndDelete(req.params.id, (err)=>{
        if(err){
            res.redirect('/climbinggyms');
        } else {
            res.redirect('/climbinggyms');
        }
    })
});



//MIDDLE WARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    else{
        res.render('login');
    }
};

function climbinggymOwnership(req, res, next){
    if(req.isAuthenticated()){
        Climbinggym.findById(req.params.id, (err, foundClimbingGym)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }
            else{
                if(foundClimbingGym.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    console.log('you do not own this');
                    res.redirect('back');
                }
            }
        })
    } else {
        console.log('you must be logged in');
        res.redirect('back');
    }
};



module.exports = router; 