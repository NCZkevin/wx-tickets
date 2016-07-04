var bomb = require('./bomb.js');
var superagent = require('superagent');
exports.userSignup = function (req,res) {

  var user = {
    "username" : req.body.username,
    "password" : req.body.stuNum,
    "phoneNum" : req.body.pNum,
    "className" : req.body.className,
    "stuNum" : req.body.stuNum
  }
  var checkID = req.body.stuNum;
  // var string = JSON.stringify(user);
  bomb.bombpost("https://api.bmob.cn/1/classes/userinfo",user);
  res.redirect('/checkqr/' + checkID);
  // superagent.post("https://api.bmob.cn/1/users")
  //           .set('X-Bmob-Application-Id','b3d4b280ec90f5bad7e07adbc714b5ea')
  //           .set('X-Bmob-REST-API-Key','a6463a5aa5cd9da869b84a5544207756')
  //           .set('Content-Type','application/json')
  //           .send(user)
  //           .end(function(err,res){
  //             // if (err) {
  //             //   console.log(err);
  //             // }
  //             console.log(res);
  //           });
}

exports.checkQr = function(req,res) {
    var qrID = req.param('id');
    res.render('checkqr',{
      qrinfo : qrID
    });
}

exports.getUserinfo = function(req,res) {
  var stuID = req.param('id');
  //  var info = bomb.find("https://api.bmob.cn/1/classes/userinfo","stuNum",stuID);
  //  var userinfo = info;
  //  console.log(userinfo);
  superagent.get("https://api.bmob.cn/1/classes/userinfo" +'?where=%7B%22'+"stuNum"+'%22:%22' + stuID + '%22%7D')
                   .set('X-Bmob-Application-Id','a224e00f77fee223f6638d7a60f00d62')
                   .set('X-Bmob-REST-API-Key','192dfa9924e475712cac68591d255770')
                   .end(function(err,data){
                     if (err) {
                       console.log(err);
                     }
                     var userinfo = data.body.results[0];
                     console.log(userinfo);
                     
                     res.render('userinfo',{
                       username : userinfo.username,
                       stuNum : userinfo.stuNum,
                       className : userinfo.className,
                       phoneNum : userinfo.phoneNum
                     });
                   });

}
