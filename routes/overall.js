let express = require('express');
let router = express.Router();

/* GET overall analytic page. */
router.get('/', function(req, res, next) {
    res.render('overall', { title: 'Express' });
});

module.exports = router;