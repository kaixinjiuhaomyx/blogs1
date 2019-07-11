var User_model = require("../models/user_model.js");
var async = require("async");
var Blog_model = require("../models/blog_model.js");


exports.index = function(req,res,next){

    Blog_model.sel_all(function(err,data){
        res.render("index.ejs",
                {
                    "title":"MM",
                    "sess":req.session,
                    "blogs":data
                });
    });

    
}


exports.reg = function(req,res,next){
    res.render("reg.ejs");
}


exports.do_reg = function(req,res,next){
    var name = req.body.uname;
    var pass = req.body.pass;

    console.log(name);
    console.log(pass);

    // 连上数据库  配制用户名代码

    // 验证用户名是否重名

    // 用async waterfall解决回调地狱问题
    async.waterfall([

        function(callback){
            User_model.checkName(name,function(err,data){
                // callback(null,data);
                if(data.length > 0){
                    res.redirect("/reg");
                }else{
                    User_model.insert_data(name,pass,function(err,data){
                        // console.log(data);
                        if(data.affectedRows > 0){
                            res.redirect("/login");
                        }
                    });
                }
            })
        }
    ], function (err, result) {
        // result now equals 'done'
        console.log(result);
    });
   



    /*
    User_model.checkName(name,function(err,data){
        console.log(data);
        if(data.length > 0){
            res.send("用户名重名");
        }else{
            User_model.insert_data(name,pass,function(err,data){
                // console.log(data);
                if(data.affectedRows > 0){
                    res.redirect("/login");
                }
            })
        }
    })*/

/*
    User_model.insert_data(name,pass,function(err,data){
        // console.log(data);
        if(data.affectedRows > 0){
            res.redirect("/login");
        }
    })
    */
    
    
}

exports.login = function(req,res,next){
    res.render("login.ejs");
}

exports.checkajax = function(req,res,next){
    var name = req.body.value;
    // res.send("success");
    // 验证当前值是否存在
    User_model.checkName(name,function(err,data){
       if(data.length > 0){
           res.send("success");
       }else{
            res.send("error");
        }
    })
    
}

exports.do_login = function(req,res,next){
    var name = req.body.uname;
    var pass = req.body.pass;

    User_model.sel_name_by_pass(name,pass,function(err,data){
        // console.log(data);
        if(data.length > 0){
            // console.log("login success");
            req.session = data[0];
            res.redirect('/');
        }else{
            res.redirect("/login");
            // console.log("login error");
            // console.log(data);
            

        }
    })
}

exports.unlogin = function(req,res,next){
    req.session = null;
    res.redirect('/');
}