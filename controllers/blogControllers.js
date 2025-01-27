const Blog = require('../models/Blog');

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const { title, content, author, tags, category } = req.body;

    const newBlog = new Blog({
      title,
      content,
      author,
      tags,
      category,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({ success: true, data: savedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all blog posts
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single blog post by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a blog post
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a blog post
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, message } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    blog.comments.push({ username, message });
    const updatedBlog = await blog.save();

    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  addComment,
};
