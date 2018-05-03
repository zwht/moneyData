"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var indexRouter = express.Router();
exports.indexRouter = indexRouter;
/* GET home page. */
indexRouter.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
