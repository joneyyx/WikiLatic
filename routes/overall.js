let express = require('express');
let router = express.Router();
let overallController = require('../app/controllers/overallController');

router.use(overallController);

/* GET overall analytic page. */
router.get('/', function (req, res, next) {
    res.render('overall', {
        title: 'Overall Analytics',
        user: req.session.user,
        rank: 3,
        maxRev: req.session.maxRev,
        minRev: req.session.minRev,
        maxUser: req.session.maxUser,
        minUser:req.session.minUser,
        maxHistory:req.session.maxHistory,
        minHistory:req.session.minHistory
    })
});

router.post('/', function (req, res, next) {
    res.render('overall', {
        title: 'Overall Analytics',
        user: req.session.user,
        rank: req.session.rank,
        maxRev: req.session.maxRev,
        minRev: req.session.minRev,
        maxUser: req.session.maxUser,
        minUser:req.session.minUser,
        maxHistory:req.session.maxHistory,
        minHistory:req.session.minHistory
    })
});

module.exports = router;