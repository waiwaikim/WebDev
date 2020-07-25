var express = require('express');
var app = express();
const port = 3000;

// Tell express to use public directory! 
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('home.ejs');   
})

app.get('/fallinginlove/:who', function (req, res) {

    const love = req.params.who;
    res.render('love.ejs', {loveVar: love});
    
})

app.get('/post', function (req, res) {

    var posts= [
        {title: 'post1', author: 'waiwai'},
        {title: 'web development is so much fun!', author: 'Tide'},
        {title: 'is snowboarding more fun than climbing', author: 'scott stevens'}
    ]
    
    res.render('posts.ejs', {posts: posts});
})



app.listen(port, console.log(`my app is listening at ${port}`))