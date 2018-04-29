// a phantomjs example
var page = require('webpage').create();
phantom.outputEncoding = "utf-8";

function getData() {
	var content = page.evaluate(function () {
		var data = [];
		var element = document.querySelector('.coin_list').querySelectorAll('.coin_unit');
		for (var i = 0; i < element.length; i++) {
			var span = element[i].querySelectorAll('span');
			data.push([]);
			for (var j = 0; j < span.length; j++) {
				data[i].push(span[j].textContent)
			}

		}
		return data;
	});
	console.log(content);
	setTimeout(function () {
		getData();
	},2000)
}
page.open("https://www.huobipro.com/zh-cn/eos_usdt/exchange/", function (status) {
	if (status === "success") {
		console.log(page.title);
		getData();
	} else {
		console.log("Page failed to load.");
	}
	// phantom.exit(0);
});