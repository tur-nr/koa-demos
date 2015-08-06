var koa = require('koa');
var app = koa();

app.use(function *(next) {

  // pass state between middleware
  this.state = {
    user: 'Batman'
  };

  yield *next;

  console.log('state: ', this.state);

});

app.use(function *(next) {

  this.state.friend = 'Superman';

  // headers
  this.set('Content-Type', 'application/json');

  // cookies
  this.cookies.set('session', 'abcdef123456');

  // status codes
  this.status = 200;

  // body
  // this.body = stream;

  yield *next;

});

app.listen(3000);
