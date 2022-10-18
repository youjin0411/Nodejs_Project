var express = require('express');
var session = require('express-session'); //session 모듈을 가져옴 
var app = express();

app.use(session ({ //app의 use를 사용해서 세션 모듈을 사용할 수 있도록 호출함
    secret: '12345678', //보완
    resave: false, //그냥 false
    saveUninitialized: true //세션을 사용하기 전까지는 발급하지 말아라, 세션 아이디를 접속할 때마다 새롭게 발급하는 것을 하지 않는다.
}))

app.get('/count', function(req, res){
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;
    }
    res.send('count : ' + req.session.count);
});

// app.get('/tmp', function(req, res){
//     res.send('result : '+req.session.count);
// })

app.listen(3003, function(){
    console.log('Connected 3003 Port');
})
