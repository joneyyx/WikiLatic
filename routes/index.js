let express = require('express');
let router = express.Router();
let registerController = require('../app/controllers/registerController');

/* GET routers. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'WikiLatic',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()});
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Login'});
});

router.get('/logout', function (req, res, next) {
    res.redirect('index');
});

router.get('/register', function (req, res, next) {
    res.render('register', {
        title: 'Login',
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});

/* POST routers. */
router.post('/login', function (req, res, next) {

});

router.post('/register', registerController.signUp);

module.exports = router;

