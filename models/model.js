
//models/blog.js
//formally know as models/review.js
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/intensive', { useNewUrlParser: true});
// const mongoose = require('mongoose');


const Blog = mongoose.model('Blog', {
    title: String,
    description: String,
    articleTitle: String,
    dropDown: Number,
});

module.exports = Blog;
