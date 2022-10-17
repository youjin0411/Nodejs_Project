var express = require('express'); //express를 가져와서 express변수에 넣음 
var cookieParser = require('cookie-parser'); //cookie(데이터를 기억해놓을 수 있는)를 사용할 수 있도록 가져옴
var app = express(); //express()함수를 실행 시키는 app변수 
app.use(cookieParser()); //cookieParser이 우리 app에 사용됨, cookie가 사용됨

var products = { //배열에 객체를 저장해놓음 (데이터베이스 대신)
    1: {title: 'The history of Web 1'},
    2: {title: 'The next Web 2'}
};
app.get('/products', function(req, res){
    var output =''; //각 객체들을 하나씩 꺼내주기 위한 변수
    for(var name in products){ //products안에 있는 객체들의 값들을 순회 시키는 것
        output += `
        <li>
            <a href="/cart/${name}">${products[name].title}</a>
        </li>`  
    }
    res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
});

/*
cart = {
    1: 1, //제품 아이디 번호: 제품 하나가 카트에 담김
    2: 1//제품 두 개가 1개 담김
}
*/

app.get('/cart/:id', function(req, res){
    var id = req.params.id;
    if(req.cookies.cart){ //req의 cookies에 cart의 값이 세팅 되어 있다면
        var  cart = req.cookies.cart;
    }else{ //cart의 값이 세팅되어 있지 않는 상태라면
        var cart = {}; //강제로 빈 객체로 초기화 
    }
    if(!cart[id]){ //만약 cart의 아이디 값이 존재하지 않는다면 (배열 벗위를 벗어남)
        cart[id] = 0; //기본값을 0으로 강제로 초기화 
    }
    cart[id] = parseInt(cart[id]+1); //기존의 값에 1이 더해짐 cookie를 통해 전달된 값은 기본적으로 문자이기 때문에 강제로 정수로 변환 해줌 
    res.cookie('cart', cart);
    res.redirect('/cart'); //카트에 담긴 목록 정보를 보여주는 redirection
});

app.get('/cart', function(req, res){
    var cart = req.cookies.cart;
    if(!cart){ //만약 cart값이 비어잇다면
        res.send("Empty!");
    }else{ //cart의 값이 비어있지 않다면
        var output = ''; 
        for(var id in cart){ //cart객체에 담긴 값만큼 순회를 함 
            output += `<li>${id}</li>`;
        }
    }
    res.send(`<ul>${output}</ul>`);
});

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