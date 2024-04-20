var express = require('express');
var router = express.Router();
var blogger=require('../controller/bloggercontroller')

router.post('/bloggerlogin',blogger.bloggerlogin)
router.get('/bloggerlogout',blogger.bloggerlogout)

router.post('/addblog',blogger.addblog)
router.get('/viewblog',blogger.viewblog)

module.exports = router;
