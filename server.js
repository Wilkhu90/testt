var express = require('express');
var fs      = require('fs');
var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;
var bodyParser = require('body-parser');
var app     = express();
var request = require('request');
var childArgs4 = [path.join(__dirname, 'openload.js'), ''];

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/', jsonParser, function(req, res){
  childArgs4[childArgs4.length-1] = req.body.movieLink;
  childProcess.execFile(binPath, childArgs4, function(err, stdout, stderr) {
    console.log(stdout);
    childProcess.exec('curl -Ls -I -w %{url_effective} '+stdout, function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stdout.match(/Location\:\s[a-zA-Z0-9\:\/\.\_\-\?\=]*/g));
      var outtxt = stdout.match(/Location\:\s[a-zA-Z0-9\:\/\.\_\-\?\=]*/g);
      var link = outtxt[0].split(":");
      console.log(link[1].trim()+':'+link[2].trim());
      res.send(link[1].trim()+':'+link[2].trim());
    });
  });
});

app.listen(process.env.PORT || 8087)
console.log('Magic happens on port 8087');
exports = module.exports = app;
