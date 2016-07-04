
function show(){

    var time=new Date();
    var msg=time+Math.random()*5;
    
    // var msg=time+num;
    // num++;
    // var msg=time+"stuID：8000113171";
    str = toUtf8(msg);
    $("#codes").qrcode({
            render: "table",
            text: str
        });
    alert(str);
   window.location.reload(); 
}
// setInterval('show()',5000);
// setTimeout('show()',3000);
