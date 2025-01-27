const mongoose = require('mongoose');


const CommentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
});


const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  content: {
    type: String,
    required: true,
    minlength: 50,
  },
  author: {
    type: String,
    required: true,
  },
  tags: {
    type: [String], 
    default: [],
  },
  category: {
    type: String,
    default: 'General',
  },
  likes: {
    type: [String], 
    default: [],
  },
  comments: [CommentSchema], 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});


BlogSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);
