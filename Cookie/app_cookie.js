var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser()); //cookieParser이 우리 app에 사용됨
app.get('/count', function(req, res){
    //웹브라우저에게 응답할 때 count를 보낸다. response (res)는 응답 
    if(req.cookies.count){
        //count의 값이 있다면 count변수에 넣고
        var count = parseInt(req.cookies.count); //강제형 정수 변환 -> 값이 문자 1일 시 숫자 1이됨 
    }else{
        //없다면 0으로 초기화
        var count = 0;
    }
    count = count + 1;
    res.cookie('count', count); //count의 값으로 1을 줌
    res.send('count : ' + count);
});
app.listen(8080, function(){
    console.log('Connected 8080 port !!!');
});