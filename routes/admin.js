var express = require('express');
var router = express.Router();
var admin=require('../controller/admincontroller')


// Admin Login

// router.post('/',admin.index)
router.post('/adminlogin',admin.adminlogin)
router.get('/adminlogout',admin.logout)

// Blog
router.post('/addblog',admin.add_blog)
router.post('/updateblog/:id',admin.update_blog)
router.get('/deleteblog/:id',admin.delete_blog)
router.get('/viewblog',admin.view_blog)

// Category
router.post('/addcategory',admin.addcategory)
router.post('/managecategory/:id',admin.managecategory)
router.get('/deletecategory/:id',admin.delete_cat)
router.get('/viewcategory',admin.view_category)

// Blogger
router.post('/addblogger',admin.add_blogger)
router.get('/viewblogger',admin.view_blogger)
router.post('/updateblogger/:id',admin.update_blogger)
router.get('/deleteblogger/:id',admin.delete_blogger)

module.exports = router;
