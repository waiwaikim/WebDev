
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      seedDB = require('./seeds'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      session = require('express-session'),
      User = require('./models/user'),
      Climbinggym = require('./models/climbinggym'),
      Comment = require('./models/comment'),
      methodOverride = require('method-override');

//Requiring Routes 
const climbinggymRoutes = require('./routes/climbinggyms'),
      commentRoutes = require('./routes/comments'),
      authRoutes = require('./routes/index');
      
const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

//===============PASSPORT CONFIGURATION ====================
app.use(session({
    secret: 'I want to work at a ski resort this winter',
    resave: false,
    saveUninitialized: false 
}));
passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//seedDB();
//===================Connecting to DB ==================
mongoose.connect('mongodb://localhost:27017/yelp_camp',{
    useNewUrlparse: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));



app.use(function(req, res, next){
    res.locals.currentUser = req.user; 
    next();
})

app.use('/climbinggyms', climbinggymRoutes);
app.use('/climbinggyms/:id/comments', commentRoutes);
app.use(authRoutes);

app.listen(port, function(){ 
    console.log('YelpProject app is listening.')
});