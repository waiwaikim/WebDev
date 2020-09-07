
const express = require('express'),
      passport = require('passport')
      User = require('../models/user');
const router =  express.Router(); 


router.get('/', (req,res)=>{
    res.render('landing');
});

//=======================================
//AUTH ROUTES
//=======================================
router.get('/register', (req, res)=>{
    res.render('register');
})

router.post('/register', (req, res)=>{
    const newUser = new User({username: req.body.username });
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            req.flash('error_message', err.message);
            res.redirect('register');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success_message', 'Welcome to Climbing Journal ' + user.username);
            res.redirect('/climbinggyms');
        })
    })
});

router.get('/login', (req, res)=>{
    res.render('login' );
});

router.post('/login', passport.authenticate("local", {
    successRedirect: '/climbinggyms' , 
    failureRedirect: '/login',
    failureFlash: true
}) ,(req, res)=>{
    res.send('login send');
});

router.get('/logout', (req, res)=>{
    req.logout();
    req.flash('success_message', 'Logged You Out!');
    res.redirect('/climbinggyms');
});


module.exports = router; 