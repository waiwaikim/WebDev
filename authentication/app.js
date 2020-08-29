

const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      session = require('express-session');
      passportLocalMongoose = require('passport-local-mongoose'),
      User = require('./models/user');
    




const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'I am going to climb all year this year',
    resave: false,
    saveUninitialized: false 
}));
passport.use(new LocalStrategy(User.authenticate()));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongoose.connect('mongodb://localhost:27017/auth_demo',{
    useNewUrlparse: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

//===========================
// ROUTES

    
app.get('/', (req,res)=>{
    res.render('home');
});

app.get('/secret', isLoggedIn ,(req,res)=>{
    res.render('secret');
});

//============================
// AUTH ROUTES
app.get('/register', (req, res)=>{
    res.render('register');
});

app.post('/register', (req, res)=>{

    User.register(new User({username: req.body.username}), req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect('/secret');
        });

    })
});

app.get('/login', (req, res)=>{
    res.render('login');
});

app.post('/login', passport.authenticate("local", {
    successRedirect: '/secret',
    failureRedirect: '/login'
}) , (req, res)=>{
});

app.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        console.log('not logged in');
        res.redirect('/login');
    }
};

app.listen(port, function(){
    console.log('Authentication Demo is listening');
});

