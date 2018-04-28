"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var postRouter = express.Router();
exports.postRouter = postRouter;
postRouter.post('/', function (req, res) {
    if (typeof req.param('name') === "undefined") {
        res.statusCode = 400;
        res.send('Error 400: products properties 222');
    }
    else {
        res.json({ k: 111 });
    }
});
