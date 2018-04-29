// a phantomjs example
var page = require('webpage').create();
var fs = require('fs');
// var path = require("path");
var url = 'https://www.huobipro.com/zh-cn/eos_usdt/exchange/'
var dataPath = '/Users/zhaowei/projects/zw/moneyData/src/phantom/data/'

phantom.outputEncoding = "utf-8";
function pad2(n) { return n < 10 ? '0' + n : n }
function getTime(){
  var time=new Date();
  return time.getFullYear()+'-'+pad2(time.getMonth()+1)+'-'+pad2(time.getDate())+
  ' '+pad2(time.getHours())+':'+pad2(time.getMinutes())+':'+pad2(time.getSeconds())
}
// 文件写入
function reateFolder(to) {
	var sep = path.sep
	var folders = path.dirname(to).split(sep);
	var p = '';
	while (folders.length) {
		p += folders.shift() + sep;
		if (!fs.existsSync(p)) {
			fs.mkdirSync(p);
		}
	}
}
function getData(time) {
	console.log(time);
	var content = page.evaluate(function () {
		var data = '';
		var element = document.querySelector('.coin_list').querySelectorAll('.coin_unit');
		for (var i = 0; i < element.length; i++) {
			var span = element[i].querySelectorAll('span');
			for (var j = 0; j < span.length; j++) {
				data += span[j].textContent
				if (span.length - 1 > j) {
					data += "&";
				}
			}
			if (element.length - 1 > i) {
				data += "#";
			}
		}
		return data;
	});
	// console.log(content);
	try {
		var pathUrl = dataPath + time + '.txt';
		//console.log(pathUrl);
		try {
			fs.write(pathUrl, content, 'a');
		} catch (e) {
			console.log(e);
		}
		/**var bu = fs.createReadStream(nowTime, { start: 0, end: 262 });
		bu.on('data', function (chunk) {
			console.log(chunk.toString());//这是结果
			fs.write(nowTime + '.txt', content, 'a');
		});**/
		// fs.mkdirSync(pathUrl,0777);
		/**fs.writeFile('uue.txt', content, function (err) {
			if (err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		});**/
	} catch (e) {
		console.log(e);
	}
	setTimeout(function () {
		getData(getTime());
	}, 1000)
}

// reateFolder(dataPath);
page.open(url, function (status) {
	if (status === "success") {
		//console.log(page.title);
		getData(getTime());
	} else {
		//console.log("Page failed to load.");
	}
	// phantom.exit(0);
});