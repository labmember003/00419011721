const productService = require('../services/productService');

const getProducts = async (req, res) => {
    try {
        const { categoryname } = req.params;
        const { n, minPrice, maxPrice, page, sortBy, sortOrder } = req.query;
        const products = await productService.getTopProducts(categoryname, n, minPrice, maxPrice, page, sortBy, sortOrder);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { categoryname, productid } = req.params;
        const product = await productService.getProductById(categoryname, productid);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getProducts, getProductById };
