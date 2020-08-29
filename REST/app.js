const express = require('express'),
      methodOverride = require('method-override'),
      expressSanitizer = require('express-sanitizer'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/restful_blog_app',{
useNewUrlparse: true,
useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

//APP CONFIG
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//MONGOOSE + MODEL CONGFIG
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
const Blog = mongoose.model("Blog", blogSchema);


//RESTFUL ROUTES
app.get('/', (req, res)=>{
    res.redirect('/blogs');
});

app.get('/blogs', (req, res)=>{
    Blog.find({}, (err, blogs)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('index', {blogs: blogs});
        }
    }) 
});

//NEW ROUTES
app.get('/blogs/new', (req, res)=>{
    res.render('new');
})

//CRETE ROOUTES
app.post('/blogs', (req,res) =>{
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, (err, blog)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/blogs')
        }
    })

})

//SHOW ROUTES 
app.get('/blogs/:id', (req, res)=>{
    Blog.findById(req.params.id , (err, foundBlog)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('show', {blog: foundBlog});
        }
    })
})

//EDIT ROUTES
app.get('/blogs/:id/edit', (req,res)=>{
    Blog.findById(req.params.id, (err, foundBlog)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('edit', {blog: foundBlog})
        }
    })
})

//UPDATE ROUTES 
app.put('/blogs/:id', (req,res)=>{
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog)=>{
        if(err){
            res.redirect('/blogs');
        }
        else{
            res.redirect('/blogs/' + req.params.id);
        }
    })
})

//DELETE ROUTES
app.delete('/blogs/:id/', (req, res)=>{
    Blog.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/blogs');
        }
    })
})


app.listen(port, function(){ 
    console.log('RESTFUL BLOG app is listening.')
});