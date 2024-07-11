const axios = require('axios');

const apiClient = axios.create({
    baseURL: "http://20.244.56.144/test",
    headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`
    }
});

module.exports = apiClient;
