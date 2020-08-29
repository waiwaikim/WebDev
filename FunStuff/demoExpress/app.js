var express = require('express');
var app = express(); 
const port = 3000; 


app.get('/', function (req, res) {
    res.send('Hi there, welcome to my assignment!');
})

app.get('/speak/:animal', function(req, res){

    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!"
    }
    let myAnimal = req.params.animal; 
    let sound = sounds[myAnimal];
    if(sound === undefined)
        res.redirect('/*');
    
    else
        res.send("The " + myAnimal + " says '" + sound  + "'");

})

app.get('/repeat/:greeting/:num', function (req, res) {

    var myNum = parseInt(req.params.num);

    let myStr = "";
    for (let i = 0; i < myNum; i++) {
        myStr += req.params.greeting + " ";
    };
    res.send(myStr);
})

app.get('*', function (req, res) {
    res.send("Sorry, page not found... What are you doing with your life?");
})

app.listen(port, console.log(`app is listening at ${port}`));
