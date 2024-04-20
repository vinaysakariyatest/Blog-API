var express = require('express');
var user=require('../controller/usercontroller')
var router = express.Router();

router.get('/viewblog',user.viewblog)

module.exports = router;
