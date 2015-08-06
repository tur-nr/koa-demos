var thunkify = require('thunkify');
var koa = require('koa');
var app = koa();

app.use(function *(next) {

  // make a promise to cook dinner
  var startCooking = new Promise(function(resolve) {
    setTimeout(function () {
      resolve('start cooking!');
    }, 3000);
  });

  console.log('waiting to start...');

  // will only console log after we can start cooking
  console.log(yield startCooking);

  // preheat the over using a thunk
  var preheat = thunkify(function(time, done) {
    setTimeout(function () {
      done(null, 'oven heated!');
    }, time);
  });

  console.log('preheating oven...');

  // will wait for the oven to preheat
  console.log(yield preheat(2000));

  // array of veggie promises
  var veggies = [
    Promise.resolve('carrots'),
    Promise.resolve('potato'),
    Promise.resolve('broccoli')
  ];

  console.log('veggies...?');

  // waits for all the vegatables
  console.log(yield veggies);

  // cook some meat and gravy
  var meat = {
    steak: Promise.resolve('steak (med-rare)'),
    gravy: Promise.resolve('cream peppercorn')
  };

  console.log('cooking meat...');

  // waits for meat to be cooked
  console.log(yield meat);

  // generator of guests, whos coming for dinner?
  var guests = function *() {
    console.log('waiting for first guest...');

    var one = new Promise(function(resolve) {
      resolve('Batman');
    });

    var two = new Promise(function(resolve) {
      resolve('Superman');
    });

    console.log(yield one, 'is here');

    console.log(yield two, 'is here');
  };

  yield *guests(); // ding dong, guests are here

  console.log('LETS EAT!!');

  yield *next;

});

app.listen(3000);
