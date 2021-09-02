const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
 authorId: {
  type: String,
  required: true,
 },
 authorName: {
  type: String,
  required: true,
 },
 authorProfession: {
  type: String,
  required: true,
 },
 title: {
  type: String,
  required: true,
 },
 tags: {
  type: Array,
  require: true,
 },
 content: {
  type: String,
  required: true,
 },
 postDate: {
  type: Date,
  required: true,
 },
 hits: {
   type: Number,
   required: true,
 }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
