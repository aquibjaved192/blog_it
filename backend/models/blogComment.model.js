const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogCommentSchema = new Schema({
 blogId: {
  type: String,
  required: true,
 },
 user: {
   type: Object,
   required: true
 },
 comment: {
   type: String,
   required: true,
 },
});

const BlogComment = mongoose.model('BlogComment', blogCommentSchema);

module.exports = BlogComment;