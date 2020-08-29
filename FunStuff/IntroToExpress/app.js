var express = require('express');
var app = express();
const port = 3000; 

app.get('/', (req,res) => res.send("Hi There"))

app.get('/bye', function (req, res) {
    console.log("someone made a request");
    res.send('BYE');
})


app.get('/r/:subreddit', function(req, res){
    let myVar = req.params.subreddit;
    res.send('WELCOME TO SUBREDDIT OF ' + myVar.toUpperCase());
})

app.get('/r/:subreddit/comment/:id/:title', function(req, res){
    console.log(req.params);
    res.send('welcome to the comment pag');
})

app.get('/dog', (req,res)=> res.send('woof woof'))

app.get('*', function(req, res){
    res.send("ANYTHING You're a star!")
})


app.listen(port, ()=> console.log(`app.js is listening at http://localhost:${port}`))