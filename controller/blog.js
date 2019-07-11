var Blog_model = require("../models/blog_model.js");


exports.index = function(req,res,next){
    // res.send("已登录的主页")
    // res.render("index.ejs",{title:'mm'});
    Blog_model.sel_all(function(err,data){
        res.render("index.ejs",{
                "title":"MM",
                "sess":req.session,
                "posts":data
            });
    })

   
}