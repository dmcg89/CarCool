
const express = require('express')
const app = express()
const mongoose = require('mongoose');
var exphbs = require('express-handlebars');
const Ride = mongoose.model('Ride', {
  start: String,
  end: String
});

mongoose.connect('mongodb://localhost/intesive');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

let rides = [
  { title: "Great Review", movieTitle: "Batman II" },
  { title: "Awesome Movie", movieTitle: "Titanic" }
]

// INDEX
app.get('/', (req, res) => {
  Ride.find()
    .then(reviews => {
      res.render('rides-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

// NEW
app.get('/rides/new', (req, res) => {
  res.render('rides-new', {});
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
