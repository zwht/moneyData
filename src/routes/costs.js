"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = require("../controller/costs/list");
var costs = [
    {
        path: '/costs/list',
        type: 'post',
        controller: list_1.list
    }
];
exports.costs = costs;
