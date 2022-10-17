var express = require('express');
var app = express();
app.get('/count', function(req, res){
    res.send('count : ');
});
app.listen(8080, function(){
    console.log('Connected 8080 port !!!');
});