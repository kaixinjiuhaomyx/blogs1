var express = require('express');
var router = express.Router();
var User = require("../controller/user.js");
var Blog = require("../controller/blog.js");
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

// function checkLogin(req,res,next){
//   if(req.session){
//     next();
//   }else{
//     res.redirect("/login");
//   }
// };

// router.get('/',checkLogin);
router.get('/',Blog.index);


router.get('/reg',User.reg);
router.post('/reg',User.do_reg);

router.get('/login',User.login);
router.post('/login',User.do_login);

router.get('/unlogin',User.unlogin);

router.post('/checkname',User.checkajax);

module.exports = router;