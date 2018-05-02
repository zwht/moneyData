"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./../../service/db");
var list = function (req, res, next) {
    var listObj = db_1.costModel.find({
    //occupation: /host/,
    //'name.last': 'Ghost',
    //age: { $gt: 17, $lt: 66 },
    //likes: { $in: ['vaporizing', 'talking'] }
    }).
        limit(10).
        //sort({ occupation: -1 }).
        //select({ name: 1, occupation: 1 }).
        exec(function (err, data) {
        console.log(data);
        res.json({ data: listObj });
    });
};
exports.list = list;
