import * as express from "express";
let postRouter = express.Router();

postRouter.post('/', function (req, res) {
	if (typeof req.param('name') === "undefined") {
		res.statusCode = 400;
		res.send('Error 400: products properties 222');
	}else{
		res.json({k: 111})
	}
});

export {postRouter};
