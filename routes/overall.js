let express = require('express');
let router = express.Router();

/* GET overall analytic page. */
router.get('/', function(req, res, next) {
    res.render('overall', {
        title: 'Overall Analytics',
        user: req.session.user
    });
});

module.exports = router;