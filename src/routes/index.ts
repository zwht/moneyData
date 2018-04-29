import * as express from 'express'
import { mongoose } from './../service/db'
import * as phantom from 'phantom'
phantom.outputEncoding = "utf-8";
let indexRouter = express.Router();
/* GET home page. */
indexRouter.get('/', function (req, res, next) {

	function getData(page) {
		let data = [];
		let element = document.querySelector('.coin_list').querySelectorAll('.coin_unit');
		for (let i = 0; i < element.length; i++) {
			let span = element[i].querySelectorAll('span');
			data.push([]);
			for (let j = 0; j < span.length; j++) {
				data[i].push(span[j].textContent)
			}
		}
		console.log(data);
		setTimeout(function () {
			getData(page);
		}, 2000)
	}

	console.log("开始======");
	phantom.create().then(function (ph) {
		ph.createPage().then(function (page) {
			page.open("https://www.huobipro.com/zh-cn/steem_usdt/exchange/").then(function (status) {
				//page.property('viewportSize', {width: 720,height:1}).then(function() {});
				if (status === 'success') {
					console.log(page.target);
					page.property('content').then(function (content) {
						getData(page.target);
						//page.render(opts[0].replace(".html","")+".png", {format: 'png', quality: '100'});
						page.render('test' + ".pdf", { format: 'pdf', quality: '300' });
						page.close();
						setTimeout(function () {
							ph.exit(0);
						}, 1000);
					});

				} else {
					console.log('打开页面失败' + status);
					ph.exit(1);
				}
			});
		});
	});

	const Cat = mongoose.model('test', { name: String });
	const kitty = new Cat({ name: 'Zildjian' });
	kitty.save().then(() => console.log('meow'));
	res.render('index', { title: 'Express' });
});

export { indexRouter };
