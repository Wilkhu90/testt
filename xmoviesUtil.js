var path = require('path');
var childProcess = require('child_process');
var request = require('request');
var now = new Date().getTime().toString();
console.log(now);
console.log(now.substring(9, now.length));

childProcess.execFile('curl', ['https://fmovies.se/ajax/episode/info?ts=1496509200&_='+'2387'+'&id=k22w3w&update=0'], function(err, stdout, stderr){
  console.log(JSON.parse(stdout));
  var loadResult = 'https:'+JSON.parse(stdout).value+'&_='+new Date().getTime();
  console.log(loadResult);
  childProcess.execFile('curl', [loadResult], function(err, stdout, stderr) {
    console.log(stdout);
  });
});
