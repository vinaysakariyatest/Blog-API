var adminmodel=require('../model/adminmodel');
var addblog=require('../model/addblog');
var category=require('../model/category');
var blogger=require('../model/bloggermodel')
var bcrypt=require('bcrypt');
const storage = require('node-persist');
storage.init( /* options ... */ );


// var login_status='';


/*========================================
                ADMIN LOGIN
========================================== */
// exports.index=async(req,res)=>{
//     var b_pass=await bcrypt.hash(req.body.password,10)
//     req.body.password=b_pass
//     var data=await adminmodel.create(req.body)
//     res.status(200).json({
//         status:"Data insert"
//     })
// }

exports.adminlogin= async (req,res)=>{
    var data = await adminmodel.find({"email":req.body.email})
    var login_status=await storage.getItem('admin_id')
    if(login_status==undefined)
    {
        if(data.length==1)
        {
            bcrypt.compare(req.body.password, data[0].password, async function(err, result) {
                if(result==true)
                {
                    // login_status=1
                    // login_status=await storage.setItem('admin_id',data[0].id)
                    console.log(await storage.setItem('admin_id',data[0].id));
                    res.status(200).json({
                        status:"Login Success"
                    })
                    
                }else{
                    res.status(200).json({
                        status:"Check your Email and Password"
                    })
                }
            });    
        }else{
            res.status(200).json({
                status:"Check your Email and Password"
            })
        }
    }else{
        res.status(200).json({
            status:"Admin is already login"
        })
    }
}

/*========================================
                ADMIN LOGOUT
========================================== */
exports.logout=async (req,res)=>{
    // login_status=0
    storage.removeItem('admin_id')
    res.status(200).json({
        status:"Admin Logout"
    })
}

/*========================================
                BLOG
==========================================*/
// ADD BLOG
exports.add_blog=async(req,res)=>{
    var temp=await storage.getItem('admin_id')

    if(temp!=undefined) {
        
    var data=await addblog.create(req.body)
    res.status(200).json({
        status:"Blog Added"
    })
    }else{
        res.status(200).json({
            status:"Please Login"
        })
    }
}


// Update Blog
exports.update_blog=async(req,res)=>{
    var temp=await storage.getItem('admin_id')

    if (temp != undefined) {
        var id = req.params.id;
        // Fetch __v from the database
        var existingData = await addblog.find(req.body);
        var __v = await existingData[0].__v;
        
        var sta;
        if (__v == 0) {
            sta = "Pending";
        }else if (__v == 1) {
            sta = "Accepted";
        }else if(__v == 2){
            sta = "Decline";
        }
        
        // Include sta in req.body
        req.body.sta = sta;
        
        // Update document with new sta
        var data = await addblog.findByIdAndUpdate(id,req.body);

        res.status(200).json({
            status: "Blog Updated",
            newStatus: sta
        });
    }
    else{
    res.status(200).json({
        status:"Please Login"
    })
}
}


// Delete Blog
exports.delete_blog=async(req,res)=>{
    var temp=await storage.getItem('admin_id')

    if(temp!=undefined){
    var id=req.params.id
    var data=await addblog.findByIdAndDelete(id)
    res.status(200).json({
        status:"Blog Deleted"
    })
}else{
    res.status(200).json({
        status:"Please Login"
    })
}
}

// View Blog
exports.view_blog=async(req,res)=>{

    var temp=await storage.getItem('admin_id')

    if(temp!==undefined) {
    var data=await addblog.find()
    res.status(200).json({
        data
    })
}else{
    res.status(200).json({
        status:"Please Login"
    })
}
}

/*========================================
                BLOG CATEGORY
==========================================*/

// ADD CATEGORY
exports.addcategory=async(req,res)=>{
    var temp=await storage.getItem('admin_id')

    if(temp!=undefined) {
    var addcat=await category.create(req.body)
    res.status(200).json({
        status:"Category Added"
    })
}else{
    res.status(200).json({
        status:"Please Login"
    })
}
}

// MANAGE CATEGORY
exports.managecategory=async(req,res)=>{
    var temp=await storage.getItem('admin_id')

    if(temp!=undefined){
    var id=req.params.id
    var data=await category.findByIdAndUpdate(id,req.body)
    res.status(200).json({
        status:"Category Updated",
    })
}else{
    res.status(200).json({
        status:"Please Login"
    })
}
}

// DELETE CATEGORY
exports.delete_cat=async(req,res)=>{
    var temp=await storage.getItem('admin_id')

    if(temp!=undefined){
    var id=req.params.id
    var data=await category.findByIdAndDelete(id)
    res.status(200).json({
        status:"Category Deleted"
    })
}else{
    res.status(200).json({
        status:"Please Login"
    })
}
}
// View Category
exports.view_category=async(req,res)=>{
    var temp=await storage.getItem('admin_id')

    if(temp!=undefined){
    var data=await category.find()

    res.status(200).json({
        data
    })
}else{
    res.status(200).json({
        status:"Please Login"
    })
}
}
/*========================================
                BLOGGER
==========================================*/

// Add Blogger
exports.add_blogger=async(req,res)=>{
    var temp=await storage.getItem('admin_id')

    if(temp!=undefined){
    var b_pass=await bcrypt.hash(req.body.password,10)
    req.body.password=b_pass
    var data=await blogger.create(req.body)
    res.status(200).json({
        status:"Blogger Added"
    })
}else{
    res.status(200).json({
        status:"Please Login"
    })
}
}

// View Blogger
exports.view_blogger=async(req,res)=>{
    var temp=await storage.getItem('admin_id')

    if(temp!=undefined) {
    var view=await blogger.find()
    res.status(200).json({
        view
    })
}else{
    res.status(200).json({
        status:"Please Login"
    })
}
}

// Update Blogger
exports.update_blogger=async(req,res)=>{
    var temp=await storage.getItem('admin_id')

    if(temp!=undefined){
    var id=req.params.id
    var data=await blogger.findByIdAndUpdate(id,req.body)
    res.status(200).json({
        status:"Blogger Updated"
    })
}else{
    res.status(200).json({
        status:"Please Login"
    })
}
}

// Delete Blogger
exports.delete_blogger=async(req,res)=>{
    if(login_status ==1){
    var id=req.params.id
    var data=await blogger.findByIdAndDelete(id)
    res.status(200).json({
        status:"Blogger Deleted"
    })
}else{
    res.status(200).json({
        status:"Please Login"
    })
}
}