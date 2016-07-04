var express = require('express');
var crypto = require('crypto');
var Index = require('../controllers/index');
var Qcode = require('../controllers/qcode');
var bomb = require('../controllers/bomb');
// var token = "weixin"; //此处需要你自己修改！
/* GET home page. */
module.exports = function(app){
  app.get('/', function(req, res, next) {
    // bomb.bombget("https://api.bmob.cn/1/classes/wx_user","bbf1cf9f0e");
     res.render('index',{
        title: "微信"
     });
  });
  app.get('/checkqr/:id', Index.checkQr);
  app.get('/qrimg',Qcode.createqcode);
  app.get('/userinfo/:id',Index.getUserinfo);

  app.get('/lessonlist', function(req, res) {
    res.render('lessonlist');
  });

  app.get('/user', function(req, res) {
    res.render('user');
  });
  app.post('/user', Index.userSignup);

  app.get('/student', function(req, res) {
    res.render('student');
  });

  app.get('/lesson', function(req, res) {
    res.render('lesson');
  });

  app.get('/addlesson', function(req, res) {
    res.render('addlesson');
  });
};

// router.get('/', function(req, res, next) {
//    // var signature = req.query.signature;
//    // var timestamp = req.query.timestamp;
//    // var nonce = req.query.nonce;
//    // var echostr = req.query.echostr;
//    // /*  加密/校验流程如下： */
//    // //1. 将token、timestamp、nonce三个参数进行字典序排序
//    // var array = new Array(token,timestamp,nonce);
//    // array.sort();
//    // var str = array.toString().replace(/,/g,"");
//    // //2. 将三个参数字符串拼接成一个字符串进行sha1加密
//    // var sha1Code = crypto.createHash("sha1");
//    // var code = sha1Code.update(str,'utf-8').digest("hex");
//    // //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
//    // if(code===signature){
//    //    res.send(echostr)
//    // }else{
//    //    res.send("error");
//    // }
//    res.render('index',{
//       title: "微信"
//    });
// });
//
// router.get('/check',function(req,res){
//   res.render('check');
// });
//
// router.get('/lessonlist', function(req, res) {
//   res.render('lessonlist');
// });
//
// router.get('/user', function(req, res) {
//   res.render('user');
// });
//
// router.get('/student', function(req, res) {
//   res.render('student');
// });
//
// router.get('/lesson', function(req, res) {
//   res.render('lesson');
// });
//
// router.get('/addlesson', function(req, res) {
//   res.render('addlesson');
// });


// module.exports = router;
