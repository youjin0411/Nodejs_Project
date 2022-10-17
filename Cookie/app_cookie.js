var express = require('express'); //express를 가져와서 express변수에 넣음 
var cookieParser = require('cookie-parser'); //cookie(데이터를 기억해놓을 수 있는)를 사용할 수 있도록 가져옴
var app = express(); //express()함수를 실행 시키는 app변수 
app.use(cookieParser()); //cookieParser이 우리 app에 사용됨, cookie가 사용됨 
app.get('/count', function(req, res){ //http://localhost:8080/count 일 때, req 요청, res응답
    //웹브라우저에게 응답할 때 count를 보낸다. response (res)는 응답 
    if(req.cookies.count){ //cookie의 count를 서버에 요청
        //count의 값이 있다면 count변수에 넣고
        var count = parseInt(req.cookies.count); //강제형 정수 변환 -> 값이 문자 1일 시 숫자 1이됨 
    }else{
        //없다면 0으로 초기화
        var count = 0;
    }
    count = count + 1;
    res.cookie('count', count); //count의 값으로 1을 응답해서 줌 
    res.send('count : ' + count); //count의 값으로 count를 응답해서 출력한 후 저장해줌
});
app.listen(8080, function(){ //서버 port가 8080일 때, console창에 서버가 실행 중임을 표시해줌
    console.log('Connected 8080 port !!!');
});