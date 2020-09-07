const express = require('express'),
      Climbinggym = require('../models/climbinggym'),
      Comment = require('../models/comment')
      middlWare = require('../middleware');

const router =  express.Router({mergeParams: true}); 



//=======================================
//COMMENT ROUTES
//=======================================

//NEW
router.get('/new',  middleWare.isLoggedIn,  (req, res)=>{

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
router.post('/',  middleWare.isLoggedIn, (req, res)=>{
    Climbinggym.findById(req.params.id, (err, foundClimbingGym)=>{
        if(err){
            req.flash('error_message', 'Something went wrong');
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
                    req.flash('success_message', 'Successfully added comment');
                    res.redirect('/climbinggyms/' +foundClimbingGym._id );
                }
            })
        }
    })
});


//EDIT
router.get('/:comment_id/edit',  middleWare.commentOwnership,(req,res)=>{

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
router.put('/:comment_id/',  middleWare.commentOwnership, (req, res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment)=>{
        if(err){
            console.log(err);
            res.redirect('back');
        }
        else{
            req.flash('success_message', 'You successfully edited the post' );
            res.redirect('/climbinggyms/' + req.params.id);
        }
    })
});


//DELETE
router.delete('/:comment_id',  middleWare.commentOwnership,  (req, res)=>{
    Comment.findByIdAndDelete(req.params.comment_id, (err)=>{
        if(err){
            res.redirect('back');
        } else{
            req.flash('success_message', 'Comment deleted');
            res.redirect('/climbinggyms/' + req.params.id);
        }
    })
});


module.exports = router; 