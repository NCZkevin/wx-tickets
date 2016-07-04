var qr = require('qr-image');


exports.createqcode = function (req,res) {
  //  var text = "blog.nczkevin.com";
  //  var temp_qrcode = qr.image('http://www.baidu.com',{size:1000});
  //  res.type('png');
  //  temp_qrcode.pipe(res);
  var text = req.query.text;
  try {
      var img = qr.image(text,{size :10});
      res.writeHead(200, {'Content-Type': 'image/png'});
      img.pipe(res);
  } catch (e) {
      res.writeHead(414, {'Content-Type': 'text/html'});
      res.end('<h1>414 Request-URI Too Large</h1>');
  }
}
