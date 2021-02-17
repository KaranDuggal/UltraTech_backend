const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller')
const productController = new ProductController();

/* GET users listing. */
router.post('/addproduct', productController.add_product)
router.get('/allproduct', productController.get_all_product)
router.get('/allproduct/:id', productController.get_product)
router.delete('/allproduct/:id/delete', productController.delete_product)
router.put('/allproduct/:id/edit', productController.edit_product)


module.exports = router;
