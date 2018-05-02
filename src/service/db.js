"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/moneyData');
var currencyModel = mongoose.model('currency', { name: String });
exports.currencyModel = currencyModel;
var costModel = mongoose.model('cost', { name: String });
exports.costModel = costModel;
