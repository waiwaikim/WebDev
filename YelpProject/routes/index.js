
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
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/climbinggyms');
        })
    })
});

router.get('/login', (req, res)=>{
    res.render('login');
});

router.post('/login', passport.authenticate("local", {
    successRedirect: '/climbinggyms' , 
    failureRedirect: '/login'
}) ,(req, res)=>{
    res.send('login sned');
});

router.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/climbinggyms');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    else{
        res.render('login');
    }
};

module.exports = router; 