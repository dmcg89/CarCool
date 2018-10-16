const methodOverride = require('method-override');
const express = require('express');
const app = express();
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Blog = require('./models/model');
const port = process.env.PORT || 3000;



app.use(bodyParser.urlencoded({ extended: true}));



app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

module.exports = app;
const blogs = require('./controllers/routes')(app, Blog);

app.listen(port, () => {
    console.log('App Listening on port 3000');
});
