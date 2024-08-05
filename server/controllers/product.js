const asyncHandler = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');
const successResponse = require('../utils/successResponse');
const Product = require('../models/product');

/**
 * @desc Get all products
 * @route GET /api/product/
 * @access Public
 */
const getProducts = asyncHandler(async(req, res, next) => {
    const products = await Product.find();
    console.log("products",products);
    if(!products)
        return next(new errorResponse('DONT HAVE products'));
    //return successResponse(req, res, products);
    return res.status(200).json({
        success: true,
        products
    })
});

/**
 * @desc Get single product
 * @route GET /api/product/:id
 * @access Public
 */
const getProduct = asyncHandler(async(req, res, next) => {
    let product = await Product.findOne({id: req.params.id});
    if(!product)
        product = await Product.findOne({_id: req.params.id});
    console.log("product", product);
    if(product == null)
        return next(new errorResponse(`Dont have product with id :[${req.params.id}]`));
    return res.status(200).json({
            success: true,
            product
        })
        //return successResponse(req, res, product);
});

/**
 * @desc Create new product
 * @route POST /api/product/
 * @access Public
 */
const createProduct = asyncHandler(async(req, res, next) => {
    console.log("create new product", req.body)
    let productSchema = {
        id: req.body.id,
        name : req.body.name,
        price: req.body.price,
    }

    let product = await Product.findOne({id: productSchema.id});
    console.log("product", product);
    if(product)
        return next(new errorResponse(`The product with id :[${req.params.id}] exist`));
    product = await Product.create(productSchema);
    if(!product)
        return next(new errorResponse(`Cannot create new product`));
    return res.status(200).json({
            success: true,
            productSchema,
        })
        //return successResponse(req, res, productSchema);
});

/**
 * @desc Update product
 * @route PUT /api/product/id
 * @access Public
 */
const updateProduct = asyncHandler(async(req, res, next) => {
    console.log("update product", req.params.id);
    let productSchema = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
    }
    console.log(productSchema);
    let product = await Product.findOne({id: productSchema.id});
    if(!product)
        return next(new errorResponse(`The product with id :[${req.params.id}] is not exist`));
    product = await Product.updateOne({id: productSchema.id},productSchema);
    if(!product)
        return next(new errorResponse(`Cannot create new product`));
    return res.status(200).json({
            success: true,
            productSchema
        })
        //return successResponse(req, res, productSchema);
});

/**
 * @desc Delete product
 * @route DELETE /api/product/:id
 * @access Public
 */
const deleteProduct = asyncHandler(async(req, res, next) => {
    let product = await Product.findOne({id: req.params.id});
    if(!product)
        return next(new errorResponse(`The product with id :[${req.params.id}] is not exist`));
    await Product.deleteOne({id: req.params.id})
    .then(async()=>{
        const products = await Product.find();
    return res.status(200).json({
        success: true,
        products
    });
    })
    .catch((err) =>{
        if(err)
            return next(new errorResponse('delete failed', 401));
        })   
});

module.exports = {
    getProducts, getProduct, createProduct, updateProduct, deleteProduct,
}



