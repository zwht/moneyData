"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var costs_1 = require("./costs");
var routerList = [costs_1.costs];
var postRouter = express.Router();
var routerServer = function (app) {
    routerList.forEach(function (obj) {
        obj.forEach(function (item) {
            console.log(item.type);
            app.use(item.path, postRouter[item.type]('/', item.controller));
        });
    });
};
exports.routerServer = routerServer;
