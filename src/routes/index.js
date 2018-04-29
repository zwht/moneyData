"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = require("./../service/db");
var indexRouter = express.Router();
exports.indexRouter = indexRouter;
/* GET home page. */
indexRouter.get('/', function (req, res, next) {
    var Cat = db_1.mongoose.model('test', { name: String });
    var kitty = new Cat({ name: 'Zildjian' });
    kitty.save().then(function () { return console.log('meow'); });
    res.render('index', { title: 'Express' });
});
