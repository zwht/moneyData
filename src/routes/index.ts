import * as express from 'express'
import { mongoose } from './../service/db'
import * as phantom from 'phantom'

let indexRouter = express.Router();
/* GET home page. */
indexRouter.get('/', function (req, res, next) {
	const Cat = mongoose.model('test', { name: String });
	const kitty = new Cat({ name: 'Zildjian' });
	kitty.save().then(() => console.log('meow'));
	res.render('index', { title: 'Express' });
});

export { indexRouter };
