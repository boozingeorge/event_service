var express = require('express'),
    path = require('path');
  
var router = express.Router();

/*
 * Static routes
 */
router.use(express.static(path.join(__dirname, '../public')));

module.exports = router;