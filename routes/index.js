let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res, next) {
    res.render('login');
});

router.get('/logout', function (req, res, next) {
    res.redirect('index');
});

router.get('/signup', function (req, res, next) {
    res.render('sign-up');
});

router.post('/signup', function (req, res, next) {

});

module.exports = router;

