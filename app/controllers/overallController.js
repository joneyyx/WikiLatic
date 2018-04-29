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
function getMaxAndMin(Counts, rank) {
    let result = [],
        max = [],
        min = [];
    for (let i = 0; i < rank; i++) {
        min.push(Counts[i]);
        max.push(Counts[Counts.length - i - 1]);
    }
    result.push(max, min);
    // console.log(result);
    return result;
}


/** controller for Rank By Reversion */
module.exports = function (req, res, next) {
    // set array to store the counts of each article
    let revCounts = [],
        userCounts = [],
        histories = [],
        oldest,
        latest;

    // iterator 强行把异步变同步
    (function iterator(i) {
        // check if all collections have been traversed
        if (i === titles.length) {
            revCounts = revCounts.sort(compare('count'));
            userCounts = userCounts.sort(compare('count'));
            histories = histories.sort(compare('history'));

            /** find top @rank articles with max and min number of reversions, according @req.body.rank */
            let rank = req.body.rank;
            let result = [];

            // check whether @req.body.rank POSTed
            if (rank) {
                result = getMaxAndMin(revCounts, rank);
                req.session.rank = rank;
            } else {
                result = getMaxAndMin(revCounts, 3);
            }

            req.session.maxRev = result[0];
            req.session.minRev = result[1];

            /** find top 1 article with max and min number of users */
            result = getMaxAndMin(userCounts, 1);

            req.session.maxUser = result[0];
            req.session.minUser = result[1];

            /** find top 3 articles with max and min number of history */
            result = getMaxAndMin(histories, 3);
            req.session.maxHistory = result[0];
            req.session.minHistory = result[1];

            next();
        }

        /** traverse collections and count reversion number of each article */
        Article(titles[i]).count(function (err, count) {
            if (err) {
                throw err;
            }
            revCounts.push({
                title: titles[i],
                count: count
            });
        });

        /** traverse collections and count user number of each article */
        Article(titles[i]).aggregate([
            {
                $project: {
                    user: 1
                }
            },
            {
                $group: {
                    _id: "$user"
                }
            }
        ]).exec(function (err, turnover) {
            if (err) {
                throw err;
            }
            userCounts.push({
                title: titles[i],
                count: turnover.length
            });

            // iterator(i + 1);
        });

        /** traverse collections and calculate history */
        // find oldest timestamp
        Article(titles[i]).findOne().sort('timestamp').exec(function (err, post) {
            oldest = post.timestamp.substring(0, 4);
        });

        // find latest timestamp
        Article(titles[i]).findOne().sort('-timestamp').exec(function (err, post) {
            latest = post.timestamp.substring(0, 4);
            // console.log('..'+ oldest, latest);
            histories.push({
                title: titles[i],
                history: latest - oldest
            });
            iterator(i + 1);
        });
    })(0);
};
