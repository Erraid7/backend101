const express = require('express');
const app = express();

const port = 3000;

// Middleware express and ejs and json
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', { title: 'ESI 101', discription: 'Welcome to ESI 101', author: 'rami'});
});

app.get('/add_blog', (req, res) => {
    res.render('add_blog');
});

app.get('/show_blog', (req, res) => {
    res.render('show_blog');
});

// delete post put

app.listen(port, () => {   
    console.log(`Server is running on http://localhost:${port}`);
});