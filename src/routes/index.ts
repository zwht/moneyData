import * as express from 'express'
import * as phantom from 'phantom'

let indexRouter = express.Router();
/* GET home page. */
indexRouter.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

export { indexRouter };
