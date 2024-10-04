const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { ObjectId } = require('mongodb');


// connect to our database using mongoose
mongoose.connect('mongodb://localhost:27017/backend101')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port);
        console.log(`Server running at http://localhost:${port}`);
    })
    .catch((error) => console.error('Could not connect to MongoDB:', error));


// Middleware express and ejs and json
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

const port = 3000;


// get endponit to show all our blogs
app.get('/',async (req, res) => {
    try{
    // retreave our data from our data base
    const blogs = await Blog.find();
    res.render('home', {blogs});
    }catch{
        res.status(500).json({message: error});
    };
});

// post endpoint to add a blog
app.post('/add_blog', async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    });

    try{
        const newBlog = await blog.save();
        res.status(201).json({newBlog, success: true});
    }catch(error){
        res.status(400).json({message: error , success: false});
    }
});


// put endpoint to update a blog
app.put('/edit_blog/:id', async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if (req.body.title) blog.title = req.body.title;
        if (req.body.author) blog.author = req.body.author;
        if (req.body.content) blog.content = req.body.content;
        const updatedBlog = await blog.save();
        res.json({updatedBlog, success: true});
    }catch(error){
        res.status(400).json({message: error, success: false});
    }
});


// delete endpoint to delete a blog
app.delete('/delete_blog/:id', async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id).deleteOne();
        console.log(blog);
        res.json({blog, success: true});
    }catch(error){
        res.status(400).json({message: error, success: false});
    }
});


// get endpoint to show one blog
app.get('/show_blog/:id', async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({message: 'Blog not found'});
        res.render('show_blog', {blog});
    }catch(error){
        res.status(400).json({message: error});
    }
});



app.get('/add_blog', (req, res) => {res.render('add_blog')});
app.get('/show_blog', (req, res) => {res.render('show_blog')});