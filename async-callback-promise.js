/* Step 1: Callback hell — N levels deep */

var request = require('request');
var url1='http://httpbin.org/', url2=url1, url3=url1, url4=url1;

function foo(finalCallback) {
  request.get(url1, function(err1, res1) {
    if (err1) { return finalCallback(err1); }
    request.post(url2, function(err2, res2) {
      if (err2) { return finalCallback(err2); }
      request.put(url3, function(err3, res3) {
        if (err3) { return finalCallback(err3); }
        request.del(url4, function(err4, res4) {
          // let's stop here
          if (err4) { return finalCallback(err4); }
          finalCallback(null, "whew all done");
        })
      })
    })
  })
}

// use that function somewhere
foo(function(err, message) {
  if (err) {
    return console.log("error!", err);
  }
  console.log("success!", message);
});


/* Step 2: Promises — 1 level deep */

var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var url1='http://httpbin.org/', url2=url1, url3=url1, url4=url1;

function foo() {
  return request.getAsync(url1)
  .then(function(res1) {
    return request.postAsync(url2);
  }).then(function(res2) {
    return request.putAsync(url3);
  }).then(function(res3) {
     return request.delAsync(url4);
  }).then(function(res4) {
     return "whew all done";
  });
}

// use that function somewhere
foo().then(function(message) {
  console.log("success!", message);
}).catch(function(err) {
  console.log("error!", err);
});


/* Step 3: ES7 async/await */

var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var url1='http://httpbin.org/', url2=url1, url3=url1, url4=url1;

async function foo() {
  var res1 = await request.getAsync(url1);
  var res2 = await request.getAsync(url2);
  var res3 = await request.getAsync(url3);
  var res4 = await request.getAsync(url4);
  return "whew all done";
}

// use that function somewhere
foo().then(function(message) {
  console.log("success!", message);
}).catch(function(err) {
  console.log("error!", err);
});