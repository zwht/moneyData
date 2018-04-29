var child_process = require('child_process');
var events = require('events');

exports.GetPageVisual = function (url, callback) {

  var emitter = new events.EventEmitter();

  setTimeout(function () {
    let child = child_process.spawn('phantomjs', ['getPhantomPage.js', url]);
    child.stdout.setEncoding('utf8');
    child.stdout.on("data", function (data) {
      emitter.emit("success", data);
    });
    child.stderr.on('data', function (data) {
      emitter.emit("error", data);
    });

    child.on('exit', function (code, signal) {
      emitter.emit("exit", code);
    });
  }, 100)

  return emitter;
}