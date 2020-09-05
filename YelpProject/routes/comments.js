const express = require('express'),
      Climbinggym = require('../models/climbinggym'),
      Comment = require('../models/comment');

const router =  express.Router({mergeParams: true}); 



//=======================================
//COMMENT ROUTES
//=======================================

//NEW
router.get('/new', isLoggedIn,  (req, res)=>{

    Climbinggym.findById(req.params.id, (err, foundClimbingGym)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('comments/new', {climbinggym: foundClimbingGym});
        }
    })
});


//CREATE
router.post('/', isLoggedIn, (req, res)=>{
    Climbinggym.findById(req.params.id, (err, foundClimbingGym)=>{
        if(err){
            console.log(err);
            res.redirect('climbinggyms');
        }
        else{
            Comment.create(req.body.comment, (err, comment)=>{
                if(err){
                    console.log(err);
                }
                else{
                    
                    comment.author.id = req.user._id; 
                    comment.author.username = req.user.username; 
                    comment.save();
                    foundClimbingGym.comments.push(comment);
                    foundClimbingGym.save();
                    res.redirect('/climbinggyms/' +foundClimbingGym._id );
                }
            })
        }
    })
});


//EDIT
router.get('/:comment_id/edit', commentOwnership,(req,res)=>{

    Comment.findById(req.params.comment_id, (err, foundComment)=>{
        if(err){
            console.log(err);
            res.redirect('back');
        }
        else{
            res.render('comments/edit', { climbinggym_id: req.params.id,
                                          comment: foundComment});
        }
    })
});

//UPDATE
router.put('/:comment_id/', commentOwnership, (req, res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment)=>{
        if(err){
            console.log(err);
            res.redirect('back');
        }
        else{
            res.redirect('/climbinggyms/' + req.params.id);
        }
    })
});


//DELETE
router.delete('/:comment_id', commentOwnership,  (req, res)=>{
    Comment.findByIdAndDelete(req.params.comment_id, (err)=>{
        if(err){
            res.redirect('back');
        } else{
            res.redirect('/climbinggyms/' + req.params.id);
        }
    })
});


//MIDDLE WARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    else{
        res.render('login');
    }
};

function commentOwnership(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }
            else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    console.log('you do not own this');
                    res.redirect('back');
                }
            }
        })
    } else {
        console.log('you must be logged in');
        res.redirect('back');
    }
};

module.exports = router; 