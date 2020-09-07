
const Climbinggym = require('../models/climbinggym'),
        Comment = require('../models/comment');



var middlewareObj = {};



middlewareObj.climbinggymOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Climbinggym.findById(req.params.id, (err, foundClimbingGym)=>{
            if(err){
                req.flash('error_message', 'Climbing gym not found');
                res.redirect('back');
            }
            else{
                if(foundClimbingGym.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash('error_message', 'You do not a permission to do that' );
                    res.redirect('back');
                }
            }
        })
    } else {
        req.flash('error_message', 'You must be logged in first.');
        res.redirect('back');
    }
};



middlewareObj.commentOwnership = function(req, res, next){
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
                    req.flash('error_message', 'You do not own this item!');
                    res.redirect('back');
                }
            }
        })
    } else {
        req.flash('error_message', 'You must be logged in first.');
        res.redirect('back');
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    else{
        req.flash('error_message', 'You must be logged in first.');
        res.redirect('/login');
    }
};





module.exports = middlewareObj; 