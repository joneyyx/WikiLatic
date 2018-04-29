let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('individual', {
        title: 'Individual Analytics',
        user: req.session.user
    });
});

module.exports = router;