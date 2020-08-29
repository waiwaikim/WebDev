const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: String,
    author: String
});

//Compile schema to model
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;