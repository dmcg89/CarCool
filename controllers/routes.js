const Ride = require('../models/model');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//index

module.exports = function(app, Ride) {
    app.get('/', (request, response) => {
        Ride.find()
        .then(rides => {
            response.render('rides-index', {rides: rides});
        })
        .catch(err => {
            console.log(err);
        });
    });

    // show

    app.get('/rides/view/:id', (req, res) => {
        Ride.findById(req.params.id).then((ride) => {
            res.render('rides-show', { ride: ride })
        }).catch((err) => {
            console.log(err.message);
        })
    });

    // delete

    app.delete('/rides/view/:id', function (req, res) {
        console.log("Delete Ride");
        Ride.findByIdAndRemove(req.params.id).then((ride) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })
    // edit page
    app.get('/rides/view/:id/edit', (req, res) => {
        Ride.findById(req.params.id, function(err, ride) {
            res.render('rides-edit', { ride: ride });
        })
    })


    app.post('/rides/view', (req, res) => {
        Ride.create(req.body).then((ride) => {
            console.log(ride);
            res.redirect(`/rides/view/${ride._id}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })


    app.put('/rides/view/:id', (req, res) => {
        Ride.findByIdAndUpdate(req.params.id, req.body)
        .then(ride => {
            res.redirect(`/rides/view/${ride._id}`)
        })
        .catch(err => {
            console.log(err.message);
        })
    })

    app.get('/rides', (req, res) => {
        res.render('rides-index', {})
    })


    app.get('/rides/new', (req, res) => {
        res.render('rides-new', {});
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
        // Create User
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
