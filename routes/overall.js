let express = require('express');
let router = express.Router();
let overallController = require('../app/controllers/overallController');

/* GET overall analytic page. */
router.get('/', overallController.overallController);

module.exports = router;