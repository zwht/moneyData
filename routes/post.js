var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
	if (typeof req.param('name') === "undefined") {
		res.statusCode = 400;
		res.send('Error 400: products properties 222');
	}else{
		res.json({k: 111})
	}
});

module.exports = router;
