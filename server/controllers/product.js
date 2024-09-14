const asyncHandler = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');
const successResponse = require('../utils/successResponse');
const Product = require('../models/product');

/**
 * @desc Get all products
 * @route GET /api/product/:from
 * @access Public
 */
const getProducts = asyncHandler(async(req, res, next) => {
    const productszn = await Product.productzn.find();
    const productsbh = await Product.productbh.find();
    console.log("products", req.params.from, productszn)
    const products = req.params.from == "zn" ? productszn : productsbh;
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
 * @route GET /api/product/:from/:id
 * @access Public
 */
const getProduct = asyncHandler(async(req, res, next) => {
    let productzn = await Product.productzn.findOne({id: req.params.id});
    let productbh = await Product.productbh.findOne({id: req.params.id});
    if(!productzn && !productbh){
        productzn = await Product.productzn.findOne({_id: req.params.id});
        productbh = await Product.productbh.findOne({_id: req.params.id});
    }
    if(!productzn && !productbh)
        return next(new errorResponse(`Dont have product with id :[${req.params.id}]`));
    const product = req.params.from == "zn"? productzn : productbh;
    return res.status(200).json({
            success: true,
            product,
        })
        //return successResponse(req, res, product);
});

/**
 * @desc Create new product
 * @route POST /api/product/:from
 * @access Public
 */
const createProduct = asyncHandler(async(req, res, next) => {
    console.log("create new product", req.body)
    let productSchema = {
        id: req.body.id,
        name : req.body.name,
        price: req.body.price,
        from: req.body.from,
    }

    let product = req.body.from == "zn"? await Product.productzn.findOne({id: productSchema.id}) : await Product.productbh.findOne({id: productSchema.id});
    console.log("product", product);
    if(product)
        return next(new errorResponse(`The product with id :[${req.params.id}] exist`));
    product = req.body.from == "zn"? await Product.productzn.create(productSchema) : await Product.productbh.create(productSchema);
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
 * @route PUT /api/product/:from/:id
 * @access Public
 */
const updateProduct = asyncHandler(async(req, res, next) => {
    console.log("update product", req.params.id);
    let productSchema = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        from: req.body.from,
    }
    console.log(productSchema);
    let product = await req.body.from == "zn"? await Product.productzn.findOne({id: productSchema.id}) : await Product.productbh.findOne({id: productSchema.id});
    if(!product)
        return next(new errorResponse(`The product with id :[${req.params.id}] is not exist`));
    product = req.body.from == "zn"? await Product.productzn.updateOne({id: productSchema.id},productSchema) : await Product.productbh.updateOne({id: productSchema.id},productSchema);
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
 * @route DELETE /api/product/:from/:id
 * @access Public
 */
const deleteProduct = asyncHandler(async(req, res, next) => {
    let product = req.body.from == "zn"? await Product.productzn.findOne({id: req.params.id}): await Product.productbh.findOne({id: req.params.id});
    if(!product)
        return next(new errorResponse(`The product with id :[${req.params.id}] is not exist`));
    req.body.from == "zn"? 
    await Product.productzn.deleteOne({id: req.params.id})
    .then(async()=>{
        const products = await Product.productzn.find();
    return res.status(200).json({
        success: true,
        products
    });
    })
    .catch((err) =>{
        if(err)
            return next(new errorResponse('delete failed', 401));
        })
    : await Product.productbh.deleteOne({id: req.params.id})
    .then(async()=>{
        const products = await Product.productbh.find();
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



