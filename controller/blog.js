exports.index = function(req,res,next){
    // res.send("已登录的主页")
    res.render("index.ejs",{title:'mm'});
}