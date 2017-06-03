// Usage: phantomjs openload.js <video_url>

var page = require('webpage').create(),
  system = require('system');

page.settings.userAgent = 'Mozilla/5.0 (Linux; Android 6.0; LENNY3 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.132 Mobile Safari/537.36';

page.open(system.args[1], function(status) {
  var info = page.evaluate(function() {
    return document.getElementById('streamurl').innerHTML;
  });
  var url = 'https://openload.co/stream/' + info + '?mime=true';
  console.log(url);
  phantom.exit();
});

page.onInitialized = function() {
  page.evaluate(function() {
    delete window.callPhantom;
    delete window._phantom;
  });
};
