import * as mongoose from "mongoose"

mongoose.connect('mongodb://localhost:27017/moneyData');
const currencyModel = mongoose.model('currency', { name: String });
const costModel = mongoose.model('cost', { name: String });


export {currencyModel,costModel}

