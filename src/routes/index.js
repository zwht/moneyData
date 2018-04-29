"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = require("./../service/db");
var phantom = require("phantom");
phantom.outputEncoding = "utf-8";
var indexRouter = express.Router();
exports.indexRouter = indexRouter;
/* GET home page. */
indexRouter.get('/', function (req, res, next) {
    function getData(page) {
        var data = [];
        var element = document.querySelector('.coin_list').querySelectorAll('.coin_unit');
        for (var i = 0; i < element.length; i++) {
            var span = element[i].querySelectorAll('span');
            data.push([]);
            for (var j = 0; j < span.length; j++) {
                data[i].push(span[j].textContent);
            }
        }
        console.log(data);
        setTimeout(function () {
            getData(page);
        }, 2000);
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
                }
                else {
                    console.log('打开页面失败' + status);
                    ph.exit(1);
                }
            });
        });
    });
    var Cat = db_1.mongoose.model('test', { name: String });
    var kitty = new Cat({ name: 'Zildjian' });
    kitty.save().then(function () { return console.log('meow'); });
    res.render('index', { title: 'Express' });
});
