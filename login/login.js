var express = require('express');
var sesstion = require('express-session');
var bodyParser = require('body-parser'); //POST요청 
var app = express();
//app이 bodyParser을 사용하는 것을 등록을 시켜놓는 것 
app.use(bodyParser.urlencoded({extended: false}));
app.use(sesstion({
    secret: '123456',
    resave: false,
    saveUninitialized: true
}));
app.get('/count', function(req, res){
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;
    }
    res.send('count : '+ req.session.count);
});
app.get('/welcome', function(req, res){
    if(req.session.displayname){
        res.send(`
        <h1>Hello, &{req.session.displayname}</h1>
        <a href="/auth/logout">Logout</a>   
        `);
    }else{
        res.send(`
        <h1>Welcome</h1>
        <a href="/auth/login">Login</a>
        `);
    }
    res.send(req.session);
})
//error 발생 
//기본적으로 express는 POST방식으로 전송된 데이터를 처리해 주지 않기 때문에 그것을 처리해주는 
//모듈이 필요하다. npm install body-parser
app.post('/auth/login', function(req, res){ //POST방식
    var user = {
        username: 'youjin',
        password: '0411',
        displayname: 'Youjin'
    };
    var uname = req.body.username;
    var pwd = req.body.password;
    if(uname === user.username && pwd === user.password){
        req.session.displayname = user.displayname;
        res.redirect('/welcome'); //새창
    }else{
        res.send('Who are you ? <a href="/auth/login">login</a>');
    }
});
app.get('/auth/login', function(req, res){
    var output = `
    <h1>Login</h>
    <form action="/auth/login">
        <p>
            <input type="text" name="id" placeholder="username">
        </p>
        <p>
            <input type="password" name="password" placeholder="password">
        </p>
        <p>
            <input type="submit">
        </p>
    </form>`;

    res.send(output);
});
app.listen(3004, function(){
    console.log('Connected 3003 Port!!');
});