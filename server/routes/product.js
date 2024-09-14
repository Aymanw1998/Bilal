const express = require('express');
const multer = require('multer');
const router = express.Router();
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct, } = require('../controllers/product');


router.route('/:from').get(getProducts);
router.route('/:from/:id').get(getProduct);
router.route('/').post(createProduct);
router.route('/:id').put(updateProduct);
router.route('/:from/:id').delete(deleteProduct);
module.exports = router;