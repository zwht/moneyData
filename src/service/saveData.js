"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./../service/db");
// import * as fs from 'fs';
var fs = require('fs');
var dataPath = '/Users/zhaowei/projects/zw/moneyData/src/phantom/data/';
var cost = db_1.mongoose.model('cost', { name: String });

function pad2(n) { return n < 10 ? '0' + n : n; }
function getTime() {
    var time = new Date(new Date().getTime() - 2000);
    return time.getFullYear() + '-' + pad2(time.getMonth() + 1) + '-' + pad2(time.getDate()) +
        ' ' + pad2(time.getHours()) + ':' + pad2(time.getMinutes()) + ':' + pad2(time.getSeconds());
}
function readFile() {
    var listObj = [];
    var nowTime = dataPath + getTime() + '.txt';
    //nowTime = "/Users/zhaowei/projects/zw/moneyData/src/phantom/2018-04-30 03:03:40.txt"
    try {
        fs.readFile(nowTime, 'utf-8', function (err, data) {
            if (err) {
                console.error(err);
            }
            else {
                var list = data.split('#');
                for (var i = 0; i < list.length; i++) {
                    var item = list[i].split('&');
                    listObj.push({
                        name: item[0],
                        value: item[1],
                        scale: item[2]
                    });
                }
                cost.collection.insert(listObj, {}, function (err, jellybean, snickers) {
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
