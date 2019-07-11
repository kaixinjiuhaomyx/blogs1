/*
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'newblog'
  });


exports.insert_data = function(name,pass,callback){
    connection.connect();
 
    connection.query('SELECT * from user', function (error, results, fields) {
        if (error) throw error;
        // console.log(results);
        callback(error,results);//把数据给user  controller
        connection.end();
    });
}   */
var mysql = require('mysql');
var db = require("./db.js");

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'newblog'
});
 
exports.insert_data = function(name,pass,callback){
  // var sql = "select * from user where uname=?"

  var sql = "insert into user(uname,pass) values(?,?)"

  db.query(sql,[name,pass],callback);
  // pool.query(sql, [name],function (error, results, fields) {
  //   if (error) throw error;
  //   // console.log('The solution is: ', results[0].solution);
  //   callback(error,results);
  // });
}

exports.checkName = function(name,callback){
  var sql = "select * from user where uname=?";
  db.query(sql,[name],callback);
}

exports.sel_name_by_pass = function(name,pass,callback){
  var sql = "select * from user where uname=? and pass=?";
  db.query(sql,[name,pass],callback);
}






// 解决拼字符串的麻烦
/*connection.query('SELECT * FROM `books` WHERE `author` = ?', ['David'], function (error, results, fields) {
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
});*/