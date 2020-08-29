const express = require('express');
const app = express(); 
const axios = require('axios');
const port = 3000; 
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('search');    
})

app.get('/result', async (req, res, next) => {
    try{
        const searchTerm = req.query.search;
        
        const movie = await axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=thewdb`);
        var parsedData = movie.data;
        // xconsole.log(parsedData['Search'][0]);
        
        res.render('results', {data: parsedData});
    } catch(err){
        console.log(err);
    }
});


app.listen(port, function(){
    console.log('app is listening');
})