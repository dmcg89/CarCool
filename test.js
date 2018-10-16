const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./app');
const should = chai.should();
const Review = require('./models/model');

const sampleReview =     {
    "title": "Super Sweet Review",
    "movie-title": "La La Land",
    "description": "A great review of a lovely movie."
}

chai.use(chaiHttp);

describe('Reviews', ()  => {

    after(() => {
        Review.deleteMany({title: 'Super Sweet Review'}).exec((err, blogs) => {
            console.log(blogs)
            blogs.remove();
        })
    });

    // TEST INDEX
    it('should index ALL reviews on / GET', (done) => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
    });

    // TEST NEW
    it('should display new form on /reviews/new GET', (done) => {
        chai.request(server)
        .get(`/blogs/new`)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html
            done();
        });
    });
    // TEST SHOW
    it('should show a SINGLE review on /reviews/<id> GET', (done) => {
        var review = new Review(sampleReview);
        review.save((err, data) => {
            chai.request(server)
            .get(`/blogs/view/${data._id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });
    });
    // TEST EDIT
    it('should edit a SINGLE review on /reviews/<id>/edit GET', (done) => {
        var review = new Review(sampleReview);
        review.save((err, data) => {
            chai.request(server)
            .get(`/blogs/view/${data._id}/edit`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });
    });
    // TEST CREATE
    it('should create a SINGLE review on /reviews POST', (done) => {
        chai.request(server)
        .post('/blogs/view')
        .send(sampleReview)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html
            done();
        });
    });

    // TEST UPDATE
    it('should update a SINGLE review on /reviews/<id> PUT', (done) => {
        var review = new Review(sampleReview);
        review.save((err, data)  => {
            chai.request(server)
            .put(`/blogs/view/${data._id}?_method=PUT`)
            .send({'title': 'Updating the title'})
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });
    });

    // TEST DELETE
    it('should delete a SINGLE review on /reviews/<id> DELETE', (done) => {
        var review = new Review(sampleReview);
        review.save((err, data)  => {
            chai.request(server)
            .delete(`/blogs/view/${data._id}?_method=DELETE`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });
    });
});
