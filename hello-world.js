var koa = require('koa');
var app = koa();

app.use(function *(next) {

  this.body = 'hello'; 

  yield *next;

});

app.use(function *(next) {

  this.body += ', world!\n';

  yield *next;

});

app.listen(3000);
