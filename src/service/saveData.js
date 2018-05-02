"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./../service/db");
// import * as fs from 'fs';
var fs = require('fs');
var dataPath = '/Users/zhaowei/projects/zw/moneyData/src/phantom/data/';
function pad2(n) { return n < 10 ? '0' + n : n; }
function getTime() {
    var time = new Date(new Date().getTime() - 2000);
    return time.getFullYear() + '-' + pad2(time.getMonth() + 1) + '-' + pad2(time.getDate()) +
        ' ' + pad2(time.getHours()) + ':' + pad2(time.getMinutes()) + ':' + pad2(time.getSeconds());
}
function readFile() {
    var listObj = [];
    var nowTime = dataPath + getTime() + '.txt';
    nowTime = "/Users/zhaowei/projects/zw/moneyData/src/phantom/2018-04-30 03:03:40.txt";
    try {
        fs.readFile(nowTime, 'utf-8', function (err, data) {
            if (err) {
                console.error(err);
            }
            else {
                // 在.txt文件获取成功后，数据处理
                var list = data.split('#');
                for (var i = 0; i < list.length; i++) {
                    var item = list[i].split('&');
                    listObj.push({
                        name: item[0],
                        value: item[1],
                        scale: item[2]
                    });
                }
                // 获取币表，如果有新币，添加到表
                var currencyS_1;
                db_1.currencyModel.find(function (e, d) {
                    currencyS_1 = d;
                    for (var i = 0; i < listObj.length; i++) {
                        var key = false;
                        for (var j = 0; j < currencyS_1.length; j++) {
                            if (listObj[i].name === currencyS_1[j].name) {
                                key = true;
                            }
                        }
                        if (!key) {
                            console.log('=============');
                            db_1.currencyModel.create({
                                name: listObj[i].name
                            }, function (e, data) {
                            });
                        }
                    }
                });
                // 把币当前交易价格插入币交易表
                db_1.costModel.collection.insert(listObj, {}, function (err, jellybean, snickers) {
                });
            }
        });
    }
    catch (e) {
        console.error(e);
    }
    setTimeout(function () {
        readFile();
    }, 1000);
}
function save() {
    readFile();
}
exports.save = save;
