var koa = require('koa');
var app = koa();

app.use(function *(next) {
  
  var user = 'Batman';

  // throwing errors
  this.throw('you shall not pass', 401, { user: Batman });

  // asserting values
  this.assert(user === 'Superman', 401, 'you shall not pass');

});

app.listen(3000);
