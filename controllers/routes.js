const Rental = require('../models/rental');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//index

module.exports = function(app, Rental) {
    app.get('/', (request, response) => {
        Rental.find()
        .then(rentals => {
            response.render('rentals-index', {rentals: rentals});
        })
        .catch(err => {
            console.log(err);
        });
    });

    // show

    app.get('/rentals/view/:id', (req, res) => {
        Rental.findById(req.params.id).then((rental) => {
            res.render('rentals-show', { rental: rental })
        }).catch((err) => {
            console.log(err.message);
        })
    });

    // delete

    app.delete('/rentals/view/:id', function (req, res) {
        console.log("Delete Rental");
        Rental.findByIdAndRemove(req.params.id).then((rental) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })
    // edit page
    app.get('/rentals/view/:id/edit', (req, res) => {
        Rental.findById(req.params.id, function(err, rental) {
            res.render('rentals-edit', { rental: rental });
        })
    })


    app.post('/rentals/view', (req, res) => {
        Rental.create(req.body).then((rental) => {
            console.log(rental);
            res.redirect(`/rentals/view/${rental._id}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })


    app.put('/rentals/view/:id', (req, res) => {
        Rental.findByIdAndUpdate(req.params.id, req.body)
        .then(rental => {
            res.redirect(`/rentals/view/${rental._id}`)
        })
        .catch(err => {
            console.log(err.message);
        })
    })

    app.get('/rentals', (req, res) => {
        res.render('rentals-index', {})
    })


    app.get('/rentals/new', (req, res) => {
        res.render('rentals-new', {});
    })

    // SIGN UP FORM
    app.get('/sign-up', (req, res) => {
        res.render('sign-up');
    });

    // Login form
    app.get('/login', (req, res) =>{
        res.render('login')
    })

    // LOGOUT
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });

    // SIGN UP POST
      app.post('/sign-up', (req, res) => {
        // Create User and JWT
        const user = new User(req.body);

        user.save().then((user) => {
          var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
          res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
          res.redirect('/');
        }).catch((err) => {
          console.log(err.message);
          return res.status(400).send({ err: err });
        });
      });
}
