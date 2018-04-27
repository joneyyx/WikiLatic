let express = require('express');
let router = express.Router();
let registerController = require('../app/controllers/registerController');
let loginController = require('../app/controllers/loginController')

/* GET routers. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'WikiLatic',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()});
});

router.get('/login', function (req, res, next) {
    res.render('login', {
        title: 'Login',
        success: req.flash('success').toString(),
        error: req.flash('error').toString()});
});

router.get('/logout', function (req, res, next) {
    res.redirect('index');
});

router.get('/register', function (req, res, next) {
    res.render('register', {
        title: 'Sign Up',
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});

/* POST routers. */
router.post('/login', loginController.login);

router.post('/register', registerController.signUp);

module.exports = router;

