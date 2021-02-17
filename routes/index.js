const express = require('express');
const router = express.Router();
const userRoutes = require('./users.routes')
const productRoutes = require('./products.routes')

/* GET home page. */
router.use('/users', userRoutes);
router.use('/products', productRoutes)

module.exports = router;
