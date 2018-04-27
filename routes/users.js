var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function (req, res, next) {
	var products = [
		{name: 'apple juice', description: 'good', price: 12.12},
		{name: 'banana juice', description: 'just so sos', price: 4.50}
	];
	if (products.length <= req.params.id || req.params.id < 0) {
		res.statusCode = 404;
		return res.send('Error 404: No products found')
	}
	res.json(products[req.params.id]);
});


module.exports = router;
