var bloggermodel=require('../model/bloggermodel')
var bloggerblog=require('../model/addblog')
var bcrypt=require('bcrypt')
var login_status=""

/*=====================================
                BLOGGER
=======================================*/
// Blogger Login
exports.bloggerlogin=async (req,res)=>{
    var data = await bloggermodel.find({"email":req.body.email})

    if(login_status==0)
    {
        if(data.length==1)
        {
            bcrypt.compare(req.body.password, data[0].password, function(err, result) {
                if(result==true)
                {
                    login_status=1;
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
            status:"Blogger is already login"
        })
    }
}

// Blogger Logout
exports.bloggerlogout=async(req,res)=>{
    login_status=0
    res.status(200).json({
        status:"Blogger Logout"
    })
}

// Add Blog
exports.addblog=async(req,res)=>{
    if(login_status==1){
    var data=await bloggerblog.create(req.body)
    res.status(200).json({
        status:"Blog Added"
    })
}else{
    res.json({
        status:"Please login"
    })
}
}

// View Blog
exports.viewblog=async(req,res)=>{
    if(login_status==1){
        var data=await bloggermodel.find({"email":req.body.email})
            if(data.length>0){
                var get_blog=await bloggerblog.find({"author":data[0].name})

                if(get_blog.length>0){
                    res.status(200).json({
                        get_blog
                    })
                }else{
                res.status(200).json({
                status:"Blog Not Uploded"
            })
        }

    }else{
        res.status(200).json({
        status:"Please Login"
    })
    }
    }
}