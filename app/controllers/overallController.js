let Article = require('../models/articles');
let titles = require('../../public/consts/articleTitles');

/** compare the count, this function is used for sort an array object */
let compare = function (prop) {
    return function (obj1, obj2) {
        let val1 = obj1[prop];
        let val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    }
};


/** get max and min number of reversion and their article titles */
function getMaxAndMin(revCounts, rank) {
    let result = [],
        max = [],
        min = [];
    for (let i = 0; i < rank; i++) {
        min.push(revCounts[i]);
        max.push(revCounts[revCounts.length - i - 1]);
    }
    result.push(max, min);
    // console.log(result);
    return result;
}


/** controller for Rank By Reversion */
exports.revRank = function (req, res, next) {
    // set @revCount to store the number of reversions of each article
    let revCounts = [];

    // iterator 强行把异步变同步
    (function iterator(i) {
        // check if all collections have been traversed
        if (i === titles.length) {
            revCounts = revCounts.sort(compare('count'));
            // console.log(revCounts);

            // find top @rank of articles with max and min number of reversion, according @req.body.rank
            let rank = req.body.rank;
            let result = [];

            // check whether @req.body.rank POSTed
            if (rank) {
                result = getMaxAndMin(revCounts, rank);
            } else {
                result = getMaxAndMin(revCounts, 3);
            }

            req.session.maxRev = result[0];
            req.session.minRev = result[1];

            next();
        }

        // traverse collections and count reversion number of each article
        Article(titles[i]).count(function (err, count) {
            if (err) {
                throw err;
            }
            revCounts.push({
                title: titles[i],
                count: count
            });
            iterator(i + 1);
        })
    })(0);
};


/** controller for Rank By Author */
exports.authRank = function (req, res, next) {

};


/** controller for Rank By History */
exports.histRank = function (req, res, next) {

};
