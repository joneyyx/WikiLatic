let User = require('../models/users');

exports.signUp = function (req, res, next) {
    // get POST info
    let postData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    // check registered
    User.findOne({username: postData.username, email: postData.email}, function (err, data) {
        if (data) {
            req.flash('error', 'The username/email have already been taken.');
            // console.log(data);
            res.redirect('/register');
        } else {
            // save postData
            User.create(postData, function (err, data) {
                if(err) {
                    throw err;
                }
                req.session.user = postData.username;
                req.flash('success', 'Welcome! '+req.session.user+'.');
                // console.log('succ');
                res.redirect('/');
            });
        }
    })
};
