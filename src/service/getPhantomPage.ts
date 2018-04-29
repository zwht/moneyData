var page = require('webpage').create(),
  system = require('system'),
  t, address;

if (system.args.length === 1) {
  phantom.exit(1);
} else {
  t = Date.now();
  address = system.args[1];
  page.open(address, function (status) {
    if (status !== 'success') {
      /*console.log('FAIL to load the address');*/
    } else {
      t = Date.now() - t;
      console.log(/*'Page title is ' +*/ page.evaluate(function () {
        var head = document.getElementsByTagName("head")[0]
        var basee = document.createElement("base")
        basee.href = document.location.origin

        head.insertBefore(basee, head.firstChild);
        return document.head.innerHTML + document.body.innerHTML;
      }));
      /*console.log('Loading time ' + t + ' msec');*/
    }
    phantom.exit();
  });
}