var express = require('express');
var router = express.Router();
var OAuth = require('wechat-oauth');
var superagent = require('superagent');
var bomb = require('../controllers/bomb.js');
// 微信授权和回调
var client = new OAuth('wx08ba4d658c941629', '4f4090ab37e9656ebfabec940e6828bf');
var domain = 'nczkevin.ngrok.cc';
// 主页,主要是负责OAuth认真
router.get('/', function(req, res) {
  var url = client.getAuthorizeURL('http://' + domain + '/weixin/callback','','snsapi_userinfo');
  res.redirect(url)
})

/**
 * 认证授权后回调函数
 *
 * 根据openid判断是否用户已经存在
 * - 如果是新用户，注册并绑定，然后跳转到身份界面
 * - 如果是老用户，跳转到主页
 */
router.get('/callback', function(req, res) {
  console.log('----weixin callback -----')
  var code = req.query.code;



  client.getAccessToken(code, function (err, result) {
    console.dir(err)
    console.dir(result)
    var accessToken = result.data.access_token;
    var openid = result.data.openid;

    console.log('token=' + accessToken);
    console.log('openid=' + openid);
    res.redirect('/');
    client.getUser(openid, function (err, resul) {
      var userInfo = resul;
      console.log(resul);
      // bomb.bombget("https://api.bmob.cn/1/classes/wx_user","bbf1cf9f0e");
      //
      bomb.bombpost("https://api.bmob.cn/1/classes/wx_user",resul);
      // superagent.post("https://api.bmob.cn/1/classes/wx_user")
      //           .set('X-Bmob-Application-Id','b3d4b280ec90f5bad7e07adbc714b5ea')
      //           .set('X-Bmob-REST-API-Key','a6463a5aa5cd9da869b84a5544207756')
      //           .set('Content-Type','application/json')
      //           .send(resul)
      //           .end(function(err,res){
      //             if (err) {
      //               console.log(err);
      //             }
      //           });
    });
  //   User.find_by_openid(openid, function(err, user){
  //     console.log('微信回调后，User.find_by_openid(openid) 返回的user = ' + user)
  //     if(err || user == null){
  //       console.log('user is not exist.')
  //       client.getUser(openid, function (err, result) {
  //         console.log('use weixin api get user: '+ err)
  //         console.log(result)
  //         var oauth_user = result;

  //         var _user = new User(oauth_user);
  //         _user.username = oauth_user.nickname;
  //         _user.nickname = oauth_user.nickname;

  //         _user.save(function(err, user) {
  //           if (err) {
  //             console.log('User save error ....' + err);
  //           } else {
  //             console.log('User save sucess ....' + err);
  //             req.session.current_user = void 0;
  //             res.redirect('/user/' + user._id + '/verify');
  //           }
  //         });

  //       });
  //     }else{
  //       console.log('根据openid查询，用户已经存在')
  //       // if phone_number exist,go home page
  //       if(user.is_valid == true){
  //         req.session.current_user = user;
  //         res.redirect('/mobile')
  //       }else{
  //         //if phone_number exist,go to user detail page to fill it
  //         req.session.current_user = void 0;
  //         res.redirect('/users/' + user._id + '/verify');
  //       }
  //     }
  //   });
  });
});

module.exports = router;
