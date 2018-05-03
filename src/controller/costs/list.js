"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./../../service/db");
var response_1 = require("./../../service/response");
function dateConvert(dateParms, type) {
    var datetime;
    // 对传入的时间参数进行判断
    if (dateParms instanceof Date) {
        datetime = dateParms;
    }else{
        datetime=new Date(dateParms)
    }
    //获取年月日时分秒
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    var hour = datetime.getHours();
    var minutes = datetime.getMinutes();
    var second = datetime.getSeconds();
    //月，日，时，分，秒 小于10时，补0
    if (month < 10) {
        month = "0" + month;
    }
    if (date < 10) {
        date = "0" + date;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (second < 10) {
        second = "0" + second;
    }
    var time;
    //拼接日期格式【例如：yyyymmdd】
    //let time = year + month + date;
    //或者：其他格式等
    if (type === 'm') {
        time = year + "年" + month + "月" + date + "日" + hour + ":" + minutes + ":00";
    }
    //返回处理结果
    return time;
}
function setData(data, type) {
    var ar = [];
    data.forEach(function (element) {
        var key = true;
        var time = dateConvert(element.time, type);
        ar.forEach(function (item) {
            if (time === item.time) {
                if (item.startTime > element.time) {
                    item.startTime = element.time;
                    item.value[0] = element.value;
                }
                if (item.endTime < element.time) {
                    item.endTime = element.time;
                    item.value[1] = element.value;
                }
                if (element.value < item.value[2]) {
                    item.value[2] = element.value;
                }
                if (element.value > item.value[3]) {
                    item.value[3] = element.value;
                }
                key = false;
            }
        });
        if (key) {
            ar.push({
                startTime: new Date().getTime(),
                time: time,
                endTime: 0,
                value: [element.value, element.value, element.value, element.value]
            });
        }
    });
    return ar;
}
function list(req, res, next) {
    var reqData = req.body;
    var search = {
    //occupation: /host/,
    //'name.last': 'Ghost',
    //time: { $gt: 17, $lt: 66 },
    //likes: { $in: ['vaporizing', 'talking'] }
    };
    if (reqData.startTime && reqData.endTime) {
        search['time'] = { $gt: reqData.startTime, $lt: reqData.endTime };
    }
    if (reqData.name) {
        search['name'] = reqData.name;
    }
    var listObj = db_1.costModel.find(search)
        //.limit(100)
        //.where('name').in(['movie', 'music', 'art'])
        //sort({ occupation: -1 }).
        //select({ name: 1, occupation: 1 }).
        .exec(function (err, data) {
        res.json(response_1.reponse(setData(data, 'm'), 200));
    });
}
exports.list = list;
