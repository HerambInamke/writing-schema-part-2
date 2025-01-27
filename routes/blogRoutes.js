const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Blog routes
router.post('/blogs', blogController.createBlog); // Create blog
router.get('/blogs', blogController.getAllBlogs); // Get all blogs
router.get('/blogs/:id', blogController.getBlogById); // Get blog by ID
router.put('/blogs/:id', blogController.updateBlog); // Update blog
router.delete('/blogs/:id', blogController.deleteBlog); // Delete blog

// Comment route
router.post('/blogs/:id/comments', blogController.addComment); // Add a comment

module.exports = router;
