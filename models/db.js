var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'newblog'
});

exports.query = function(sql,params,callback){
    pool.query(sql,params,function (error, results, fields) {
        if (error) throw error;
        // console.log('The solution is: ', results[0].solution);
        callback(error,results);
    });
}