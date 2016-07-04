var superagent = require('superagent');
var request = require('request');

exports.bombpost = function (url,result) {
  superagent.post(url)
            .set('X-Bmob-Application-Id','a224e00f77fee223f6638d7a60f00d62')
            .set('X-Bmob-REST-API-Key','192dfa9924e475712cac68591d255770')
            .set('Content-Type','application/json')
            .send(result)
            .end(function(err,res){
              if (err) {
                console.log(err);
              }
              return res;
            });
}

exports.bombget = function (url,parms) {
  superagent.get(url +'/'+ parms)
            .set('X-Bmob-Application-Id','a224e00f77fee223f6638d7a60f00d62')
            .set('X-Bmob-REST-API-Key','192dfa9924e475712cac68591d255770')
            .end(function(err,res){
              if (err) {
                console.log(err);
              }

              return res;
            });
}

exports.find = function(url,key,value) {
     superagent.get(url +'?where=%7B%22'+key+'%22:%22' + value + '%22%7D')
                      .set('X-Bmob-Application-Id','a224e00f77fee223f6638d7a60f00d62')
                      .set('X-Bmob-REST-API-Key','192dfa9924e475712cac68591d255770')
                      .end(function(err,res){
                        if (err) {
                          console.log(err);
                        }

                        return res;
                      });
}
