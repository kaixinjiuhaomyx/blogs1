var db = require("./db.js");

exports.sel_all = function(callback){
    var sql = "select * from blog";
    db.query(sql,[],callback);
}