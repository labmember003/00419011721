const express = require('express');
const { getProducts, getProductById } = require('../controllers/productController');

const router = express.Router();

router.get('/:categoryname/products', getProducts);
router.get('/:categoryname/products/:productid', getProductById);

module.exports = router;
