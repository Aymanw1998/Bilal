const express = require('express');
const multer = require('multer');
const router = express.Router();
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct, } = require('../controllers/product');


router.route('/').get(getProducts);
router.route('/:id').get(getProduct);
router.route('/').post(createProduct);
router.route('/:id').put(updateProduct);
router.route('/:id').delete(deleteProduct);
module.exports = router;