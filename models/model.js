

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/intensive', { useNewUrlParser: true});



const Blog = mongoose.model('Blog', {
    route: String,
    description: String,
    time: String,
    dropDown: Number,
});

module.exports = Blog;
