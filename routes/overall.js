let express = require('express');
let router = express.Router();
let overallController = require('../app/controllers/overallController');

router.use(overallController.revRank);

/* GET overall analytic page. */
router.get('/', function (req, res, next) {
    res.render('overall', {
        title: 'Overall Analytics',
        user: req.session.user,
        maxRev: req.session.maxRev,
        minRev: req.session.minRev
    })
});

router.post('/', function (req, res, next) {
    console.log(req.body.rank);
    console.log(req.session.maxRev);
    console.log(req.session.minRev);
    res.render('overall', {
        title: 'Overall Analytics',
        user: req.session.user,
        maxRev: req.session.maxRev,
        minRev: req.session.minRev
    })
});

module.exports = router;