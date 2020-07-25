var express = require("express");
var app = express(); 
var bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
var friends =["Victor", "Andrew", "Collin", "Regina"];

app.get('/', function (req, res) {
    res.render('home');
})

app.get('/friends', function (req, res) {
    
    res.render('friends', {friends: friends});
})

app.post('/addfriend', function (req, res) {

    const newfriend = req.body.newfriend;
    friends.push(newfriend);
    res.redirect('/friends');
})


app.listen(port, function() {
    console.log("my post app is listening");
})