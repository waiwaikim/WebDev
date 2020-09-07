const express = require('express'),
      Climbinggym = require('../models/climbinggym')
      middleWare = require('../middleware');
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
router.post('/', middleWare.isLoggedIn,(req, res)=> {
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
router.get('/new',  middleWare.isLoggedIn, (req, res)=> {
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
router.get('/:id/edit',  middleWare.climbinggymOwnership, (req,res)=>{

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
router.put('/:id',  middleWare.climbinggymOwnership, (req, res)=>{
    Climbinggym.findByIdAndUpdate(req.params.id, req.body.climbinggym, (err, updatedGym)=>{
        if(err){
            console.log(err);
            res.redirect('/climbinggyms');
        }
        else{
            req.flash('success_message', 'You have successfully edited the post.');
            res.redirect('/climbinggyms/' + req.params.id);
        }
    })
});

//DELTE 
router.delete('/:id',  middleWare.climbinggymOwnership, (req,res)=>{
    Climbinggym.findByIdAndDelete(req.params.id, (err)=>{
        if(err){
            res.redirect('/climbinggyms');
        } else {
            req.flash('success_message', 'You have successfully deleted the post.');
            res.redirect('/climbinggyms');
        }
    })
});


module.exports = router; 