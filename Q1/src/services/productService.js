const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const apiClient = require('../utils/apiClient');

const getTopProducts = async (category, top, minPrice, maxPrice, page = 1, sortBy, sortOrder) => {
    const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
    let products = [];

    for (const company of companies) {
        try {
            const response = await apiClient.get(`/companies/${company}/categories/${category}/products`, {
                params: { top, minPrice, maxPrice }
            });
            const data = response.data.map(product => ({ ...product, id: uuidv4(), company }));
            products = [...products, ...data];
        } catch (error) {
            console.error(`Error fetching products from ${company}: ${error.message}`);
        }
    }

    // Sort products
    if (sortBy) {
        products.sort((a, b) => {
            if (sortOrder === 'desc') {
                return b[sortBy] - a[sortBy];
            }
            return a[sortBy] - b[sortBy];
        });
    }

    // Pagination
    const start = (page - 1) * top;
    const end = start + top;
    return products.slice(start, end);
};

const getProductById = async (category, productId) => {
    const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
    for (const company of companies) {
        try {
            const response = await apiClient.get(`/companies/${company}/categories/${category}/products`);
            const product = response.data.find(product => product.id === productId);
            if (product) {
                return { ...product, company };
            }
        } catch (error) {
            console.error(`Error fetching product by ID from ${company}: ${error.message}`);
        }
    }
    throw new Error('Product not found');
};

module.exports = { getTopProducts, getProductById };
