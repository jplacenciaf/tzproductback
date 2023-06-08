const express = require('express');
const router = express.Router();

const productService = require('../services/productService');

// Rutas para los productos
router.get('/', productService.getAllProducts);
router.get('/:id', productService.getProductById);
router.post('/', productService.createProduct);
router.put('/:id', productService.updateProduct);
router.delete('/:id', productService.deleteProduct);

module.exports = router;
