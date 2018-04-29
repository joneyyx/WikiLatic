let express = require('express');
let router = express.Router();
let overallController = require('../app/controllers/overallController');

router.use(overallController.revRank);
// router.use(overallController.authRank);

/* GET overall analytic page. */
router.get('/', function (req, res, next) {
    res.render('overall', {
        title: 'Overall Analytics',
        user: req.session.user,
        rank: 3,
        maxRev: req.session.maxRev,
        minRev: req.session.minRev,
        maxUser: req.session.maxUser,
        minUser:req.session.minUser
    })
});

router.post('/', function (req, res, next) {
    // console.log(req.body.rank);
    // console.log(req.session.maxRev);
    // console.log(req.session.minRev);
    res.render('overall', {
        title: 'Overall Analytics',
        user: req.session.user,
        rank: req.session.rank,
        maxRev: req.session.maxRev,
        minRev: req.session.minRev,
        maxUser: req.session.maxUser,
        minUser:req.session.minUser
    })
});

module.exports = router;