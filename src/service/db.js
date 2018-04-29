"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
exports.mongoose = mongoose;
mongoose.connect('mongodb://localhost:27017/moneyData');
