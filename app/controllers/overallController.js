let Article = require('../models/articles');
let articleTitles = require('../../public/consts/articleTitles');

exports.overallController = function (req, res, next) {
    res.send(articleTitles);
    res.render('overall', {
        title: 'Overall Analytics',
        user: req.session.user
    });
};
